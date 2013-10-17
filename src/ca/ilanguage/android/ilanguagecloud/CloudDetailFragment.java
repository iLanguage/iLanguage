package ca.ilanguage.android.ilanguagecloud;

import android.annotation.SuppressLint;
import android.content.Context;
import android.content.Intent;
import android.database.Cursor;
import android.net.Uri;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.util.Log;
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

	private Uri cloudUri;

	/**
	 * The fragment argument representing the item ID that this fragment
	 * represents.
	 */
	public static final String ARG_ITEM_ID = "item_id";

	/**
	 * The dummy content this fragment is presenting.
	 */
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

		Bundle extras = getActivity().getIntent().getExtras();
		Bundle arguments = getArguments();

		cloudUri = (savedInstanceState == null) ? null
				: (Uri) savedInstanceState
						.getParcelable(CloudContentProvider.CONTENT_ITEM_TYPE);

		if (extras != null) {
			cloudUri = extras
					.getParcelable(CloudContentProvider.CONTENT_ITEM_TYPE);
			getData(cloudUri);
		} else if (arguments != null) {
			cloudUri = arguments
					.getParcelable(CloudContentProvider.CONTENT_ITEM_TYPE);
			getData(cloudUri);
		}

	}

	private void getData(Uri uri) {
		String[] projection = { CloudTable.COLUMN_TITLE,
				CloudTable.COLUMN_CONTENTS, CloudTable.COLUMN_FONT };
		Cursor cursor = getActivity().getContentResolver().query(uri,
				projection, null, null, null);
		if (cursor != null) {
			cursor.moveToFirst();
			mDetailText = cursor.getString(cursor
					.getColumnIndexOrThrow(CloudTable.COLUMN_CONTENTS));
			mFont = cursor.getString(cursor
					.getColumnIndexOrThrow(CloudTable.COLUMN_FONT));

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
			Intent editDetailIntent = new Intent(getActivity(),
					CloudEditActivity.class);
			editDetailIntent.putExtra(CloudContentProvider.CONTENT_ITEM_TYPE,
					cloudUri);
			startActivity(editDetailIntent);
			return true;
		case R.id.action_new:
			Intent intent = new Intent(getActivity(), CloudEditActivity.class);
			startActivity(intent);
			return true;
		case R.id.action_exportsvg:
			mWebView.loadUrl("javascript:downloadSVG()");
			return true;
		case R.id.action_exportpng:
			mWebView.loadUrl("javascript:downloadPNG()");
			return true;
		default:
			return super.onOptionsItemSelected(item);
		}
	}

	@SuppressLint("SetJavaScriptEnabled")
	@Override
	public View onCreateView(LayoutInflater inflater, ViewGroup container,
			Bundle savedInstanceState) {
		View rootView = inflater.inflate(R.layout.fragment_cloud_detail,
				container, false);

		// Show the dummy content as text in a TextView.
		if (mDetailText != null && mFont != null) {
			JavascriptInterface myJavascriptInterface = new JavascriptInterface(
					getActivity());
			
			myJavascriptInterface.setCloudParams(mDetailText, mFont);

			mWebView = (WebView) rootView.findViewById(R.id.webView1);
			mWebView.addJavascriptInterface(myJavascriptInterface,
					"jsinterface");
			mWebView.setWebViewClient(new MyWebViewClient());
			mWebView.setWebChromeClient(new MyWebChromeClient());

			String databasePath = mWebView.getContext()
					.getDir("databases", Context.MODE_PRIVATE).getPath();

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
			webSettings.setUserAgentString(webSettings.getUserAgentString()
					+ " " + getString(R.string.app_name));

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
				Log.d(TAG, cm.message() + " -- From line " + cm.lineNumber()
						+ " of " + cm.sourceId());
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
