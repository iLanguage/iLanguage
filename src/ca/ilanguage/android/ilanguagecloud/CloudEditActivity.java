package ca.ilanguage.android.ilanguagecloud;

import android.app.Activity;
import android.content.ContentValues;
import android.database.Cursor;
import android.net.Uri;
import android.os.Bundle;
import android.text.TextUtils;
import android.util.Log;
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
	private final String mTitleCheck = getString(R.string.cloud_edit_title_check);

	private Uri cloudUri;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_cloud_edit);

		String name = this.getClass().getName();
		String[] strings = name.split("\\.");
		Log.v("crashfix", "onCreate " + strings[strings.length - 1] + " " + name);

		mFont = (Spinner) findViewById(R.id.fonts);
		mTitleText = (EditText) findViewById(R.id.cloud_edit_title);
		mBodyText = (EditText) findViewById(R.id.cloud_edit_contents);
		final Button confirmButton = (Button) findViewById(R.id.cloud_edit_button);

		final Bundle extras = getIntent().getExtras();

		// Check from the saved Instance
		cloudUri = (savedInstanceState == null) ? null
				: (Uri) savedInstanceState
						.getParcelable(CloudContentProvider.CONTENT_ITEM_TYPE);

		// Or passed from the other activity
		if (extras != null) {
			cloudUri = extras
					.getParcelable(CloudContentProvider.CONTENT_ITEM_TYPE);

			fillData(cloudUri);
		}

		confirmButton.setOnClickListener(new View.OnClickListener() {
			@Override
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
		final String[] projection = { CloudTable.COLUMN_TITLE,
				CloudTable.COLUMN_CONTENTS, CloudTable.COLUMN_FONT };
		final Cursor cursor = getContentResolver().query(uri, projection, null,
				null, null);
		if (cursor != null) {
			cursor.moveToFirst();
			final String category = cursor.getString(cursor
					.getColumnIndexOrThrow(CloudTable.COLUMN_FONT));

			for (int i = 0; i < mFont.getCount(); i++) {

				final String s = (String) mFont.getItemAtPosition(i);
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
		String name = this.getClass().getName();
		String[] strings = name.split("\\.");
		Log.v("crashfix", "onSaveInstanceState " + strings[strings.length - 1] + " " + name);
		super.onSaveInstanceState(outState);
		outState.putParcelable(CloudContentProvider.CONTENT_ITEM_TYPE, cloudUri);
//		saveState();
	}

	@Override
	protected void onPause() {
		String name = this.getClass().getName();
		String[] strings = name.split("\\.");
		Log.v("crashfix", "onPause " + strings[strings.length - 1] + " " + name);
		super.onPause();
		saveState();
	}

	@Override
	public boolean onOptionsItemSelected(MenuItem item) {
		switch (item.getItemId()) {
		case android.R.id.home:
			// NavUtils.navigateUpTo(this, new Intent(this,
			// CloudEditActivity.class));
			if (TextUtils.isEmpty(mTitleText.getText().toString())) {
				makeToast();
			} else {
				setResult(RESULT_OK);
				finish();
			}

			return true;
		}
		return super.onOptionsItemSelected(item);
	}

	private void saveState() {
		final String category = (String) mFont.getSelectedItem();
		final String summary = mTitleText.getText().toString();
		final String description = mBodyText.getText().toString();

		// Only save if either summary or description
		// is available

		if (description.length() == 0 && summary.length() == 0) { return; }

		final ContentValues values = new ContentValues();
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
		Toast.makeText(CloudEditActivity.this, mTitleCheck,
				Toast.LENGTH_LONG).show();
	}
}