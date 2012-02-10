package ca.ilanguage.android.wordcloud.preprocessor;

import java.io.File;

import android.app.Activity;
import android.content.Context;
import android.os.Bundle;
import android.util.Log;
import android.webkit.ConsoleMessage;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

public class AndroidWordlePreprocessorActivity extends Activity {
   
	protected static final String TAG = "AndroidWordCloudPreprocessor";//getString(R.string.app_name);
	public static final boolean D = true;
	private String mOutPath;
	private WebView mWebView;
	
	/** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);
        mOutPath =  this.getFilesDir().getAbsolutePath() + File.separator ;
    		
        
        mWebView = (WebView) findViewById(R.id.webView1);
    		mWebView.addJavascriptInterface(new JavaScriptInterface(this), "Android");
    		mWebView.setWebViewClient(new MyWebViewClient());
    		mWebView.setWebChromeClient(new MyWebChromeClient());
    		WebSettings webSettings = mWebView.getSettings();
    		webSettings.setBuiltInZoomControls(true);
    		//webSettings.setDefaultFontSize(26);
    		//webSettings.setDefaultZoom(WebSettings.ZoomDensity.CLOSE);
    		webSettings.setJavaScriptEnabled(true);
    		/*
    		 * Let the webview handle persistance in form data
    		 */
    		// webSettings.setSaveFormData(true);

    		/*
    		 * Use HTML5 localstorage to maintain app state requires Android 2.1 or
    		 * better, minsdk > 7
    		 */
    		webSettings.setDefaultTextEncodingName("utf-8");
    		webSettings.setAppCacheEnabled(true);
    		webSettings.setDomStorageEnabled(true);
    		webSettings.setDatabaseEnabled(true); // to use webSQL
    		webSettings.setDatabasePath(mOutPath+"databases/");
    		/*
    		 * Use HTML5 File API to read files
    		 */
    		webSettings.setAllowFileAccess(true);

    		webSettings.setLoadWithOverviewMode(true);
    		webSettings.setUseWideViewPort(true);
    		webSettings.setUserAgentString(webSettings.getUserAgentString() + " "
    				+ getString(R.string.app_name));
    		
    		mWebView.loadUrl("file:///android_asset/wordcloud.html");

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

//  	public void fileChooser(ValueCallback<Uri> uploadMsg) {
//  		if(D) Log.d(TAG, "In FileChooser");
//  		mUploadMessage = uploadMsg;
//  		Intent i = new Intent(Intent.ACTION_GET_CONTENT);
//  		i.addCategory(Intent.CATEGORY_OPENABLE);
//  		/*
//  		 * TODO customize for csv files
//  		 */
//  		i.setType("txt/*");
//  		startActivityForResult(Intent.createChooser(i, "Image Browser"),
//  				FILECHOOSER_RESULTCODE);
//  		Log.d(TAG, "End FileChooser");
//  	}

    public class JavaScriptInterface {

  		Context mContext;

  		/** Instantiate the interface and set the context */
  		JavaScriptInterface(Context c) {
  			mContext = c;

  		}

  		public void showToast(String toast) {
  			Toast.makeText(mContext, toast, Toast.LENGTH_LONG).show();
  		}
    }
}