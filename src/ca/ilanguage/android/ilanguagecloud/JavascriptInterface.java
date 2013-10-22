package ca.ilanguage.android.ilanguagecloud;

import java.io.BufferedOutputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Environment;
import android.util.Base64;

public class JavascriptInterface {

	Context mContext;
	String mCloudTitle;
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

	public void setCloudParams(String mCloudTitle, String mCloudString,
			String mCloudFont) {
		this.mCloudTitle = mCloudTitle;
		this.mCloudString = mCloudString;
		this.mCloudFont = mCloudFont;
	}

	@android.webkit.JavascriptInterface
	public void getLocalStorage(String keyValue, String fileType) {
		Long currentTime = System.currentTimeMillis() / 1000;

		storeImage(keyValue, this.mCloudTitle + "_" + currentTime.toString()
				+ "." + fileType);

	}

	public void storeImage(String imageData, String filename) {

		byte[] imageAsBytes = Base64.decode(imageData, 0);

		File filePath = new File(Environment.getExternalStorageDirectory()
				+ "/iLanguageCloud/exports/");
		filePath.mkdirs();
		String fileString = filePath.toString() + filename;

		FileOutputStream fos = null;
		BufferedOutputStream bos = null;

		try {
			fos = new FileOutputStream(fileString);
			bos = new BufferedOutputStream(fos);
			bos.write(imageAsBytes);
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			try {
				if (bos != null) {
					bos.close();
					fos.close();
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}

		mContext.sendBroadcast(new Intent(
				Intent.ACTION_MEDIA_SCANNER_SCAN_FILE, Uri.parse(fileString)));

	}
}
