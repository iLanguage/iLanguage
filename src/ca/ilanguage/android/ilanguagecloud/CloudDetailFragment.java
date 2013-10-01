package ca.ilanguage.android.ilanguagecloud;

import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.ConsoleMessage;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import ca.ilanguage.android.ilanguagecloud.dummy.DummyContent;
import ca.ilanguage.android.ilanguagecloud.JavascriptInterface;

/**
 * A fragment representing a single Cloud detail screen. This fragment is either
 * contained in a {@link CloudListActivity} in two-pane mode (on tablets) or a
 * {@link CloudDetailActivity} on handsets.
 */
public class CloudDetailFragment extends Fragment {
	
	protected static final String TAG = "WordCloud";
	public static final boolean D = true;
	private String mOutPath;
	private WebView mWebView;

	/**
	 * The fragment argument representing the item ID that this fragment
	 * represents.
	 */
	public static final String ARG_ITEM_ID = "item_id";

	/**
	 * The dummy content this fragment is presenting.
	 */
	private DummyContent.DummyItem mItem;

	/**
	 * Mandatory empty constructor for the fragment manager to instantiate the
	 * fragment (e.g. upon screen orientation changes).
	 */
	public CloudDetailFragment() {
	}

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);

		if (getArguments().containsKey(ARG_ITEM_ID)) {
			// Load the dummy content specified by the fragment
			// arguments. In a real-world scenario, use a Loader
			// to load content from a content provider.
			mItem = DummyContent.ITEM_MAP.get(getArguments().getString(
					ARG_ITEM_ID));
		}
	}

	@Override
	public View onCreateView(LayoutInflater inflater, ViewGroup container,
			Bundle savedInstanceState) {
		View rootView = inflater.inflate(R.layout.fragment_cloud_detail,
				container, false);

		// Show the dummy content as text in a TextView.
		if (mItem != null) {
			mWebView = (WebView) rootView.findViewById(R.id.webView1);
			mWebView.addJavascriptInterface(new JavascriptInterface(getActivity()),
					"Android");
			mWebView.setWebViewClient(new MyWebViewClient());
			mWebView.setWebChromeClient(new MyWebChromeClient());
			WebSettings webSettings = mWebView.getSettings();
			webSettings.setBuiltInZoomControls(true);
			// webSettings.setDefaultFontSize(26);
			// webSettings.setDefaultZoom(WebSettings.ZoomDensity.CLOSE);
			webSettings.setJavaScriptEnabled(true);
			/*
			 * Let the webview handle persistance in form data
			 */
			// webSettings.setSaveFormData(true);

			/*
			 * Use HTML5 localstorage to maintain app state requires Android 2.1
			 * or better, minsdk > 7
			 */
			webSettings.setDefaultTextEncodingName("utf-8");
			webSettings.setAppCacheEnabled(true);
			webSettings.setDomStorageEnabled(true);
			webSettings.setDatabaseEnabled(true); // to use webSQL
			webSettings.setDatabasePath(mOutPath + "databases/");
			/*
			 * Use HTML5 File API to read files
			 */
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
  			if(D) Log.d(TAG, "Overrode Url loading in WebChromeClient");
  			return true;
  		}

  		@Override
  		public boolean onConsoleMessage(ConsoleMessage cm) {
  			if(D) Log.d(TAG, cm.message() + " -- From line " + cm.lineNumber() + " of "
  					+ cm.sourceId());
  			return true;
  		}
  	}

  	class MyWebViewClient extends WebViewClient {
  		@Override
  		public boolean shouldOverrideUrlLoading(WebView view, String url) {
  			mWebView.loadUrl("javascript:console.log('URL: " + url + "')");
  			if(D) Log.d(TAG, "Overrode Url loading in WebViewClient");
  			return true;
  		}

  	}

}
