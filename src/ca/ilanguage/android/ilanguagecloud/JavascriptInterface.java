package ca.ilanguage.android.ilanguagecloud;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.media.MediaScannerConnection;
import android.media.MediaScannerConnection.OnScanCompletedListener;
import android.net.Uri;
import android.os.Environment;
import android.support.v4.app.NotificationCompat;
import android.util.Base64;
import android.util.Log;

public class JavascriptInterface {

	Context mContext;
	String mCloudTitle;
	String mCloudString;
	String mCloudFont;

	String[] saveFileLocation = new String[1];
	String[] saveMimeType = new String[1];

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

		File filePath = new File(Environment.getExternalStorageDirectory()
				+ "/iLanguageCloud/");
		filePath.mkdirs();

		String fileString = filePath.toString() + "/" + filename;
		saveFileLocation[0] = fileString;
		saveMimeType[0] = fileType == "png" ? "image/png" : "image/svg+xml";

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

		MediaScannerConnection.scanFile(mContext, saveFileLocation,
				saveMimeType, new OnScanCompletedListener() {
					@Override
					public void onScanCompleted(String path, Uri uri) {
						Log.v("testing updater", "file " + path
								+ " was scanned successfully: " + uri);

						notifyUser(uri, saveMimeType[0]);

					}
				});
	}
	
	public void notifyUser(Uri uri, String imageMimeType) {
		Intent intent = new Intent();
		intent.setAction(Intent.ACTION_GET_CONTENT);
		intent.setDataAndType(uri, imageMimeType);

		PendingIntent pIntent = PendingIntent.getActivity(mContext, 0, intent, 0);

		Notification n  = new NotificationCompat.Builder(mContext)
		        .setContentTitle("Image saved successfully.")
		        .setContentText("PNG files are viewable in the Gallery. SVG images require an SVG viewer.")
		        .setSmallIcon(R.drawable.ic_launcher)
		        .setTicker("Image saved successfully. Click to view.")
		        .setContentIntent(pIntent)
		        .setAutoCancel(true)
		        .build();

		NotificationManager notificationManager = 
				(NotificationManager) mContext.getSystemService(Context.NOTIFICATION_SERVICE);

		notificationManager.notify(0, n);
	}

}
