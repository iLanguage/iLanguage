package ca.ilanguage.android.ilanguagecloud;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;

import android.content.Context;
import android.os.Environment;

public class JavascriptInterface {

	Context mContext;
	String mCloudString;
	String mCloudFont;

	/** Instantiate the interface and set the context */
	JavascriptInterface(Context c) {
		mContext = c;
	}

	@android.webkit.JavascriptInterface
	public String getCloudString() {
		return mCloudString;
	}

	@android.webkit.JavascriptInterface
	public String getCloudFont() {
		return mCloudFont;
	}
	
	@android.webkit.JavascriptInterface
	public void sendImageToAndroid(String base64ImageString) {
//		Log.v("should have string from js)", base64ImageString);
		File externalStorageDir = Environment.getExternalStorageDirectory();
		File myFile = new File(externalStorageDir, "output.txt");
		
		if(myFile.exists()) {
			try {
				FileOutputStream fileOut = new FileOutputStream(myFile);
				OutputStreamWriter fileOutWriter = new OutputStreamWriter(fileOut);
				fileOutWriter.append(base64ImageString);
				fileOutWriter.close();
				fileOut.close();
			} catch (Exception e) {
				e.printStackTrace();
			}
		} else {
			try {
				myFile.createNewFile();
				FileOutputStream fileOut = new FileOutputStream(myFile);
				OutputStreamWriter fileOutWriter = new OutputStreamWriter(fileOut);
				fileOutWriter.append(base64ImageString);
				fileOutWriter.close();
				fileOut.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		
	}
	
	public void setCloudParams(String mCloudString, String mCloudFont) {
		this.mCloudString = mCloudString;
		this.mCloudFont = mCloudFont;
	}

}
