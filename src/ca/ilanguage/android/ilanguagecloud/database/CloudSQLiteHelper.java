package ca.ilanguage.android.ilanguagecloud.database;

import android.content.Context;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

public class CloudSQLiteHelper extends SQLiteOpenHelper {

	private static final String DATABASE_NAME = "clouds.db";
	private static final int DATABASE_VERSION = 5;

	public CloudSQLiteHelper(Context context) {
		super(context, DATABASE_NAME, null, DATABASE_VERSION);
	}

	@Override
	public void onCreate(SQLiteDatabase database) {
		CloudTable.onCreate(database);
	}
 
	@Override
	public void onUpgrade(SQLiteDatabase database, int oldVersion,
			int newVersion) {
		CloudTable.onUpgrade(database, oldVersion, newVersion);
	}

}
