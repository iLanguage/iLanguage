package ca.ilanguage.android.ilanguagecloud.database;

import android.database.sqlite.SQLiteDatabase;
import android.util.Log;

public class CloudTable {

	// table fields
	public static final String TABLE_CLOUD = "cloud";
	public static final String COLUMN_ID = "_id";
	public static final String COLUMN_FONT = "font";
	public static final String COLUMN_TITLE = "title";
	public static final String COLUMN_CONTENTS = "contents";

	// Database creation SQL statement
	private static final String DATABASE_CREATE = "create table " 
			+ TABLE_CLOUD
			+ "(" 
			+ COLUMN_ID + " integer primary key autoincrement, "
			+ COLUMN_FONT + " text not null, " 
			+ COLUMN_TITLE + " text not null, " 
			+ COLUMN_CONTENTS + " text not null" 
			+ ");";
	
	public static void onCreate(SQLiteDatabase database) {
		database.execSQL(DATABASE_CREATE);
	}
	
	public static void onUpgrade(SQLiteDatabase database, int oldVersion, int newVersion) {
		Log.w(CloudTable.class.getName(), "Upgrading database from version " 
				+ oldVersion + " to " + newVersion + ", which will destroy all previous data.");
		database.execSQL("DROP TABLE IF EXISTS " + TABLE_CLOUD);
		onCreate(database);
	}

}
