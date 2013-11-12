package ca.ilanguage.android.ilanguagecloud;

import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.content.pm.ResolveInfo;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.media.MediaScannerConnection;
import android.media.MediaScannerConnection.OnScanCompletedListener;
import android.net.Uri;
import android.os.Environment;
import android.support.v4.app.NotificationCompat;
import android.util.Base64;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;

public class JavascriptInterface {

	Context mContext;
	String mCloudTitle;
	String mCloudString;
	String mCloudFont;

	String[] saveFileLocation = new String[1];
	String[] saveMimeType = new String[1];

	/**
	 * Instantiate the interface and set the context
	 */
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

	public void setCloudParams(String mCloudTitle, String mCloudString, String mCloudFont) {
		this.mCloudTitle = mCloudTitle.replaceAll("\\W+", "");
		this.mCloudString = mCloudString;
		this.mCloudFont = mCloudFont;
	}

	@android.webkit.JavascriptInterface
	public void getLocalStorage(String keyValue, String fileType) {
		Long currentTime = System.currentTimeMillis();
		storeImage(keyValue, this.mCloudTitle + "_" + currentTime.toString() + "." + fileType, fileType);
	}

	private void storeImage(String imageData, String filename, String fileType) {

		byte[] imageAsBytes = Base64.decode(imageData, 0);

		File filePath = new File(Environment.getExternalStorageDirectory() + "/iLanguageCloud/");
		filePath.mkdirs();

		String fileString = filePath.toString() + "/" + filename;
		saveFileLocation[0] = fileString;
		saveMimeType[0] = (fileType.equalsIgnoreCase("png")) ? "image/png" : "image/svg+xml";

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

		MediaScannerConnection.scanFile(mContext, saveFileLocation, saveMimeType, new OnScanCompletedListener() {
			@Override
			public void onScanCompleted(String path, Uri uri) {
				notifyUser(uri, saveMimeType[0], saveFileLocation[0]);
			}
		});
	}

	private void notifyUser(Uri uri, String imageMimeType, String savePath) {

		Intent intent = new Intent();
		PendingIntent pIntent;

		// Special handling for SVG images. Otherwise, treat as PNG.
		if (imageMimeType.equalsIgnoreCase("image/svg+xml")) {
			// In order for attachment to get the proper file extension
			// get the fileUri from the previously saved path
			Uri fileUri = Uri.fromFile(new File(savePath));
			intent.setAction(Intent.ACTION_SEND);
			intent.putExtra(Intent.EXTRA_STREAM, fileUri);
			intent.setType(imageMimeType);

			// Use a share chooser for SVG
			String titlePrompt = mContext.getString(R.string.notification_chooser_title);
			Intent chooser = Intent.createChooser(intent, titlePrompt);
			pIntent = PendingIntent.getActivity(mContext, 1, chooser, 0);
		} else {
			// PNG is easier, as we just call a view intent
			intent.setAction(Intent.ACTION_VIEW);
			intent.setDataAndType(uri, imageMimeType);
			pIntent = PendingIntent.getActivity(mContext, 1, intent, 0);
		}

		PackageManager packageManager = mContext.getPackageManager();
		List<ResolveInfo> activities = packageManager.queryIntentActivities(intent, 0);
		boolean isIntentSafe = activities.size() > 0;

		if (!isIntentSafe) {
			return;
		}

		Bitmap bm = BitmapFactory.decodeResource(mContext.getResources(), R.drawable.ic_launcher_web);

		Notification n = new NotificationCompat.Builder(mContext)
				.setContentTitle(mContext.getString(R.string.notification_title))
				.setContentText(mContext.getString(R.string.notificaiton_text))
				.setSmallIcon(R.drawable.ic_stat_ilanguage_logo)
				.setLargeIcon(bm)
				.setTicker(mContext.getString(R.string.notification_ticker))
				.setContentIntent(pIntent)
				.setAutoCancel(true)
				.build();

		NotificationManager notificationManager = (NotificationManager) mContext.getSystemService(Context.NOTIFICATION_SERVICE);
		notificationManager.notify(0, n);
	}

}
