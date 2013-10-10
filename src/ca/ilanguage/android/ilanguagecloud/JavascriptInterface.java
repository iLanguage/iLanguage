package ca.ilanguage.android.ilanguagecloud;

import android.content.Context;
import android.widget.Toast;

public class JavascriptInterface {

	Context mContext;
	String mCloudString;
	String mCloudFont;

	/** Instantiate the interface and set the context */
	JavascriptInterface(Context c) {
		mContext = c;

	}

	@android.webkit.JavascriptInterface
	public void showToast(String toast) {
		Toast.makeText(mContext, toast, Toast.LENGTH_LONG).show();
	}

	@android.webkit.JavascriptInterface
	public String getCloudString() {
		return mCloudString;
	}

	@android.webkit.JavascriptInterface
	public String getCloudFont() {
		return mCloudFont;
	}
	
	public void setCloudParams(String mCloudString, String mCloudFont) {
		this.mCloudString = mCloudString;
		this.mCloudFont = mCloudFont;
	}

}
