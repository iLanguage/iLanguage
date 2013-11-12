package ca.ilanguage.android.ilanguagecloud;

import android.annotation.SuppressLint;
import android.content.Context;
import android.content.Intent;
import android.database.Cursor;
import android.net.Uri;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.util.Log;
import android.view.ActionMode;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.ConsoleMessage;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

import ca.ilanguage.android.ilanguagecloud.contentprovider.CloudContentProvider;
import ca.ilanguage.android.ilanguagecloud.database.CloudTable;

/**
 * A fragment representing a single Cloud detail screen. This fragment is either
 * contained in a {@link CloudListActivity} in two-pane mode (on tablets) or a
 * {@link CloudDetailActivity} on handsets.
 */
public class CloudDetailFragment extends Fragment {

	protected static final String TAG = "WordCloud";
	public static final boolean D = true;
	private WebView mWebView;
	protected Object mActionMode;

	private Uri cloudUri;

	/**
	 * The fragment argument representing the item ID that this fragment
	 * represents.
	 */
	public static final String ARG_ITEM_ID = "item_id";

	/**
	 * The content this fragment is presenting.
	 */
	private String mTitleText;
	private String mDetailText;
	private String mFont;

	/**
	 * Mandatory empty constructor for the fragment manager to instantiate the
	 * fragment (e.g. upon screen orientation changes).
	 */
	public CloudDetailFragment() {
	}

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setHasOptionsMenu(true);

		Bundle arguments = getArguments();

		cloudUri = (savedInstanceState == null) ? null : (Uri) savedInstanceState
				.getParcelable(CloudContentProvider.CONTENT_ITEM_TYPE);

		if (arguments != null) {
			cloudUri = arguments.getParcelable(CloudContentProvider.CONTENT_ITEM_TYPE);
			getData(cloudUri);
		}

	}

	private void getData(Uri uri) {
		String[] projection = {CloudTable.COLUMN_TITLE, CloudTable.COLUMN_CONTENTS, CloudTable.COLUMN_FONT};
		Cursor cursor = getActivity().getContentResolver().query(uri, projection, null, null, null);
		if (cursor != null) {
			cursor.moveToFirst();
			mTitleText = cursor.getString(cursor.getColumnIndexOrThrow(CloudTable.COLUMN_TITLE));
			mDetailText = cursor.getString(cursor.getColumnIndexOrThrow(CloudTable.COLUMN_CONTENTS));
			mFont = cursor.getString(cursor.getColumnIndexOrThrow(CloudTable.COLUMN_FONT));

			// Always close the cursor
			cursor.close();
		}
	}

	@Override
	public void onCreateOptionsMenu(Menu menu, MenuInflater inflater) {
		inflater.inflate(R.menu.cloud_detail_actions, menu);
	}

	@Override
	public boolean onOptionsItemSelected(MenuItem item) {
		// handle item selection
		switch (item.getItemId()) {
			case R.id.action_edit:
				Intent editDetailIntent = new Intent(getActivity(), CloudEditActivity.class);
				editDetailIntent.putExtra(CloudContentProvider.CONTENT_ITEM_TYPE, cloudUri);
				startActivity(editDetailIntent);
				return true;
			case R.id.action_new:
				Intent intent = new Intent(getActivity(), CloudEditActivity.class);
				startActivity(intent);
				return true;
			case R.id.action_exportsvg:
				mWebView.loadUrl("javascript:(function() { var localStorageResult = localStorage.getItem('currentSVGdata'); window.jsinterface.getLocalStorage(localStorageResult, 'svg'); })()");
				return true;
			case R.id.action_exportpng:
				mWebView.loadUrl("javascript:(function() { var localStorageResult = localStorage.getItem('currentPNGdata'); window.jsinterface.getLocalStorage(localStorageResult, 'png'); })()");
				return true;
			default:
				return super.onOptionsItemSelected(item);
		}
	}

	private ActionMode.Callback mActionModeCallback = new ActionMode.Callback() {

		@Override
		public boolean onPrepareActionMode(ActionMode mode, Menu menu) {
			return false;
		}

		@Override
		public boolean onCreateActionMode(ActionMode mode, Menu menu) {
			MenuInflater inflater = mode.getMenuInflater();
			inflater.inflate(R.menu.cloud_select_actions, menu);
			return true;
		}

		@Override
		public boolean onActionItemClicked(ActionMode mode, MenuItem item) {
			switch (item.getItemId()) {
				case R.id.action_remove:
					Toast.makeText(getActivity(), "I chose delete", Toast.LENGTH_LONG).show();
					mode.finish();
					return true;
				default:
					return false;
			}
		}

		@Override
		public void onDestroyActionMode(ActionMode mode) {
			mActionMode = null;
		}
	};

	@SuppressLint("SetJavaScriptEnabled")
	@Override
	public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
		View rootView = inflater.inflate(R.layout.fragment_cloud_detail, container, false);

		if (mDetailText != null && mFont != null) {
			JavascriptInterface myJavascriptInterface = new JavascriptInterface(getActivity());

			myJavascriptInterface.setCloudParams(mTitleText, mDetailText, mFont);

			mWebView = (WebView) rootView.findViewById(R.id.webView1);
			mWebView.addJavascriptInterface(myJavascriptInterface, "jsinterface");
			mWebView.setWebViewClient(new MyWebViewClient());
			mWebView.setWebChromeClient(new MyWebChromeClient());

			String databasePath = mWebView.getContext().getDir("databases", Context.MODE_PRIVATE).getPath();

			WebSettings webSettings = mWebView.getSettings();
			webSettings.setBuiltInZoomControls(true);
			webSettings.setJavaScriptEnabled(true);

			// Use HTML5 localstorage to maintain app state
			webSettings.setDefaultTextEncodingName("utf-8");
			webSettings.setAppCacheEnabled(true);
			webSettings.setDomStorageEnabled(true);
			webSettings.setDatabaseEnabled(true); // to use webSQL
			webSettings.setDatabasePath(databasePath);

			// Use HTML5 File API to read files
			webSettings.setAllowFileAccess(true);

			webSettings.setLoadWithOverviewMode(true);
			webSettings.setUseWideViewPort(true);
			webSettings.setUserAgentString(webSettings.getUserAgentString() + " " + getString(R.string.app_name));

			mWebView.loadUrl("file:///android_asset/wordcloud.html");
		}

		return rootView;
	}

	class MyWebChromeClient extends WebChromeClient {
		public boolean shouldOverrideUrlLoading(WebView view, String url) {
			mWebView.loadUrl("javascript:console.log('URL: " + url + "')");
			if (D) Log.d(TAG, "Overrode Url loading in WebChromeClient");
			return true;
		}

		@Override
		public boolean onConsoleMessage(ConsoleMessage cm) {
			if (D)
				Log.d(TAG, cm.message() + " -- From line " + cm.lineNumber() + " of " + cm.sourceId());
			return true;
		}
	}

	class MyWebViewClient extends WebViewClient {
		@Override
		public boolean shouldOverrideUrlLoading(WebView view, String url) {
			mWebView.loadUrl("javascript:console.log('URL: " + url + "')");
			if (D) Log.d(TAG, "Overrode Url loading in WebViewClient");
			return true;
		}

	}
}
