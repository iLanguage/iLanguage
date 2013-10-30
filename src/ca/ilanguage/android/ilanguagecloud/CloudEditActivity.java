package ca.ilanguage.android.ilanguagecloud;

import android.app.Activity;
import android.content.ContentValues;
import android.content.Intent;
import android.database.Cursor;
import android.net.Uri;
import android.os.Bundle;
import android.text.TextUtils;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.Toast;
import ca.ilanguage.android.ilanguagecloud.contentprovider.CloudContentProvider;
import ca.ilanguage.android.ilanguagecloud.database.CloudTable;

public class CloudEditActivity extends Activity {
	private Spinner mFont;
	private EditText mTitleText;
	private EditText mBodyText;
	private String mTitleCheck;

	private Uri cloudUri;
	private boolean cameFromAfar = false;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_cloud_edit);
		
		Intent intent = getIntent();

		mFont = (Spinner) findViewById(R.id.fonts);
		mTitleText = (EditText) findViewById(R.id.cloud_edit_title);
		mBodyText = (EditText) findViewById(R.id.cloud_edit_contents);
		mTitleCheck = getString(R.string.cloud_edit_title_check);
		Button confirmButton = (Button) findViewById(R.id.cloud_edit_button);
		
		String action = intent.getAction();
		String type = intent.getType();
		
		// Check for incoming intent from another application
		if (Intent.ACTION_SEND.equals(action) && type != null){
			cameFromAfar = true;
			if ("text/plain".equals(type)) {
				incomingTextData(intent);
			}
		} else {
			Bundle extras = intent.getExtras();

			// Check from the saved Instance
			cloudUri = (savedInstanceState == null) ? null
					: (Uri) savedInstanceState
							.getParcelable(CloudContentProvider.CONTENT_ITEM_TYPE);

			// Or passed from main activity
			if (extras != null) {
				cloudUri = extras
						.getParcelable(CloudContentProvider.CONTENT_ITEM_TYPE);

				fillData(cloudUri);
			}
		}

		confirmButton.setOnClickListener(new View.OnClickListener() {
			@Override
			public void onClick(View view) {
				if (TextUtils.isEmpty(mTitleText.getText().toString())) {
					makeToast();
				} else {
					setResult(RESULT_OK);
					saveState();
					if (cameFromAfar == true) {
						Intent intent = new Intent(CloudEditActivity.this, CloudListActivity.class);
						startActivity(intent);
						finish();
					} else {
						finish();
					}
				}
			}

		});
	}
	
	private void incomingTextData(Intent intent) {
		String sharedText = intent.getStringExtra(Intent.EXTRA_TEXT);
		if (sharedText != null) {
			mBodyText.setText(sharedText);
		}
	}

	private void fillData(Uri uri) {
		String[] projection = { CloudTable.COLUMN_TITLE,
				CloudTable.COLUMN_CONTENTS, CloudTable.COLUMN_FONT };
		Cursor cursor = getContentResolver().query(uri, projection, null, null,
				null);
		if (cursor != null) {
			cursor.moveToFirst();
			String category = cursor.getString(cursor
					.getColumnIndexOrThrow(CloudTable.COLUMN_FONT));

			for (int i = 0; i < mFont.getCount(); i++) {

				String s = (String) mFont.getItemAtPosition(i);
				if (s.equalsIgnoreCase(category)) {
					mFont.setSelection(i);
				}
			}

			mTitleText.setText(cursor.getString(cursor
					.getColumnIndexOrThrow(CloudTable.COLUMN_TITLE)));
			mBodyText.setText(cursor.getString(cursor
					.getColumnIndexOrThrow(CloudTable.COLUMN_CONTENTS)));

			// Always close the cursor
			cursor.close();
		}
	}

	@Override
	protected void onSaveInstanceState(Bundle outState) {
		super.onSaveInstanceState(outState);
		outState.putParcelable(CloudContentProvider.CONTENT_ITEM_TYPE, cloudUri);
	}

	@Override
	protected void onPause() {
		super.onPause();
	}

	@Override
	public boolean onOptionsItemSelected(MenuItem item) {
		switch (item.getItemId()) {
		case android.R.id.home:
			if (TextUtils.isEmpty(mTitleText.getText().toString())) {
				makeToast();
			} else {
				setResult(RESULT_OK);
				saveState();
				finish();
			}

			return true;
		}
		return super.onOptionsItemSelected(item);
	}

	private void saveState() {
		String category = (String) mFont.getSelectedItem();
		String summary = mTitleText.getText().toString();
		String description = mBodyText.getText().toString();

		// Only save if either summary or description
		// is available

		if (description.length() == 0 && summary.length() == 0) { return; }

		ContentValues values = new ContentValues();
		values.put(CloudTable.COLUMN_FONT, category);
		values.put(CloudTable.COLUMN_TITLE, summary);
		values.put(CloudTable.COLUMN_CONTENTS, description);

		if (cloudUri == null) {
			// New cloud
			cloudUri = getContentResolver().insert(
					CloudContentProvider.CONTENT_URI, values);
		} else {
			// Update cloud
			getContentResolver().update(cloudUri, values, null, null);
		}
	}

	private void makeToast() {
		Toast.makeText(CloudEditActivity.this, mTitleCheck, Toast.LENGTH_LONG)
				.show();
	}
}