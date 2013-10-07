package ca.ilanguage.android.ilanguagecloud;

import android.app.Activity;
import android.content.ContentValues;
import android.database.Cursor;
import android.net.Uri;
import android.os.Bundle;
import android.text.TextUtils;
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

	private Uri cloudUri;

	@Override
	protected void onCreate(Bundle bundle) {
		super.onCreate(bundle);
		setContentView(R.layout.activity_cloud_edit);

		mFont = (Spinner) findViewById(R.id.fonts);
		mTitleText = (EditText) findViewById(R.id.cloud_edit_title);
		mBodyText = (EditText) findViewById(R.id.cloud_edit_contents);
		Button confirmButton = (Button) findViewById(R.id.cloud_edit_button);

		Bundle extras = getIntent().getExtras();

		// Check from the saved Instance
		cloudUri = (bundle == null) ? null : (Uri) bundle
				.getParcelable(CloudContentProvider.CONTENT_ITEM_TYPE);

		// Or passed from the other activity
		if (extras != null) {
			cloudUri = extras
					.getParcelable(CloudContentProvider.CONTENT_ITEM_TYPE);

			fillData(cloudUri);
		}

		confirmButton.setOnClickListener(new View.OnClickListener() {
			public void onClick(View view) {
				if (TextUtils.isEmpty(mTitleText.getText().toString())) {
					makeToast();
				} else {
					setResult(RESULT_OK);
					finish();
				}
			}

		});
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

	protected void onSaveInstanceState(Bundle outState) {
		super.onSaveInstanceState(outState);
		saveState();
		outState.putParcelable(CloudContentProvider.CONTENT_ITEM_TYPE, cloudUri);
	}

	@Override
	protected void onPause() {
		super.onPause();
		saveState();
	}

	private void saveState() {
		String category = (String) mFont.getSelectedItem();
		String summary = mTitleText.getText().toString();
		String description = mBodyText.getText().toString();

		// Only save if either summary or description
		// is available

		if (description.length() == 0 && summary.length() == 0) {
			return;
		}

		ContentValues values = new ContentValues();
		values.put(CloudTable.COLUMN_FONT, category);
		values.put(CloudTable.COLUMN_TITLE, summary);
		values.put(CloudTable.COLUMN_CONTENTS, description);

		if (cloudUri == null) {
			// New todo
			cloudUri = getContentResolver().insert(
					CloudContentProvider.CONTENT_URI, values);
		} else {
			// Update todo
			getContentResolver().update(cloudUri, values, null, null);
		}
	}

	private void makeToast() {
		Toast.makeText(CloudEditActivity.this, "Please maintain a summary",
				Toast.LENGTH_LONG).show();
	}
}