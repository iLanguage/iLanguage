package ca.ilanguage.android.ilanguagecloud;

import android.content.Context;
import android.widget.Toast;

public class JavascriptInterface {

	Context mContext;

	/** Instantiate the interface and set the context */
	JavascriptInterface(Context c) {
		mContext = c;

	}

	@android.webkit.JavascriptInterface
	public void showToast(String toast) {
		Toast.makeText(mContext, toast, Toast.LENGTH_LONG).show();
	}
}
