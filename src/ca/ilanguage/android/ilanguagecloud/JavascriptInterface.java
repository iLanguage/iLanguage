package ca.ilanguage.android.ilanguagecloud;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

import android.content.Context;
import android.media.MediaScannerConnection;
import android.media.MediaScannerConnection.OnScanCompletedListener;
import android.net.Uri;
import android.os.Environment;
import android.util.Base64;
import android.util.Log;

public class JavascriptInterface {

	Context mContext;
	String mCloudTitle;
	String mCloudString;
	String mCloudFont;
	public static String[] fileMimeType = new String[0];

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
		this.mCloudTitle = mCloudTitle.replaceAll("\\W+", "");
		this.mCloudString = mCloudString;
		this.mCloudFont = mCloudFont;
	}

	@android.webkit.JavascriptInterface
	public void getLocalStorage(String keyValue, String fileType) {
		Long currentTime = System.currentTimeMillis();
		
		storeImage(keyValue, this.mCloudTitle + "_" + currentTime.toString()
				+ "." + fileType, fileType);

	}

	public void storeImage(String imageData, String filename, String fileType) {

		byte[] imageAsBytes = Base64.decode(imageData, 0);
		fileMimeType[0] = fileType == "png" ? "image/png" : "image/svg+xml";

		File filePath = new File(Environment.getExternalStorageDirectory()
				+ "/iLanguageCloud/");
		filePath.mkdirs();
		String fileString = filePath.toString() + "/" + filename;

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

		MediaScannerConnection.scanFile(mContext,
				new String[] { fileString }, fileMimeType,
				new OnScanCompletedListener() {
					@Override
					public void onScanCompleted(String path, Uri uri) {
						Log.v("testing updater", "file " + path
								+ " was scanned successfully: " + uri);
					}
				});

	}
}
