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

	@android.webkit.JavascriptInterface
	public String getCloudString() {
		String cloudString = "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.";
		return cloudString;
	}
}
