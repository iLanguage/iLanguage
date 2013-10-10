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
	
	private static final String DATABASE_INITILIZE = "insert into "
			+ TABLE_CLOUD
			+ "("
			+ COLUMN_FONT + ", "
			+ COLUMN_TITLE + ", "
			+ COLUMN_CONTENTS
			+ ") "
			+ "values "
			+ "("
			+ "'Impact', "
			+ "'Sample Cloud', "
			+ "'In meteorology, a cloud is a visible mass of liquid droplets or frozen crystals made of water or various chemicals suspended in the atmosphere above the surface of a planetary body.[1] These suspended particles are also known as aerosols and are studied in the cloud physics branch of meteorology.Terrestrial cloud formation is the result of air in Earths atmosphere becoming saturated due to either or both of two processes; cooling of the air and adding water vapor. With sufficient saturation, precipitation will fall to the surface; an exception is virga, which evaporates before reaching the surface.Clouds in the troposphere, the atmospheric layer closest to Earths surface, have Latin names due to the universal adaptation of Luke Howards nomenclature. It was introduced in December 1802 and became the basis of the modern classification system. Synoptic surface weather observations use code numbers to record and report any type of tropospheric cloud visible at scheduled observation times based on its height and physical appearance.The international cloud classification system is based on the fact that these aerosols in their most basic forms can show free-convective upward growth into low or vertical heaps of cumulus, appear in non-convective layered sheets at various altitudes as with low stratus and its higher variants, or take the form of high thin fibrous wisps of cirrus. In the case of low and vertical or multi-level clouds, prefixes are used whenever necessary to express variations or complexities in these basic forms. These include strato- for low cumulus layers with limited convection that show some stratus-like characteristics, cumulo- for complex highly convective vertical nimbus storm clouds, and nimbo- for thick stratus layers with sufficient vertical extent to produce moderate to heavy precipitation. For higher-based cloud types, the prefixes specify middle or high altitude ranges; alto- for middle, and cirro- for high. Cloud types prefixed by altitude range may be of simple non-convective stratiform structure or show slightly to moderately complex stratocumuliform structure due to limited convective activity. Free-convective clouds with potentially more complex forms are not prefixed by altitude range. Whether or not a cloud is classified as low, middle, or high level depends on the altitude range of its base above Earths surface. In the case of a layer or heap with significant vertical extent, the height of the top is also a factor that defines its altitude classification.. A vertically developed cloud can initially form or have its base in the low or middle altitude range of the troposphere depending on the moisture content of the air, while the top can be in the middle or high range.While a majority of clouds form in Earths troposphere, there are occasions when they can be observed at much higher altitudes in the stratosphere and mesosphere. These three main atmospheric layers are collectively known as the homosphere. Above this lies the thermosphere and exosphere, which together make up the heterosphere that marks the transition to outer space. Clouds have been observed on other planets and moons within the Solar System, but, due to their different temperature characteristics, they are composed of other substances such as methane, ammonia, and sulfuric acid.Cloud computing, or something being in the cloud, is a colloquial expression used to describe a variety of different types of computing concepts that involve a large number of computers connected through a real-time communication network such as the Internet.[1] Cloud computing is a term without a commonly accepted unequivocal scientific or technical definition. In science, cloud computing is a synonym for distributed computing over a network and means the ability to run a program on many connected computers at the same time. The phrase is also more commonly used to refer to network-based services which appear to be provided by real server hardware, which in fact are served up by virtual hardware, simulated by software running on one or more real machines. Such virtual servers do not physically exist and can therefore be moved around and scaled up (or down) on the fly without affecting the end user—arguably, rather like a cloud.The popularity of the term can be attributed to its use in marketing to sell hosted services in the sense of application service provisioning that run client server software on a remote location.'"
			+ ");";
			
	public static void onCreate(SQLiteDatabase database) {
		database.execSQL(DATABASE_CREATE);
		database.execSQL(DATABASE_INITILIZE);
	}
	
	public static void onUpgrade(SQLiteDatabase database, int oldVersion, int newVersion) {
		Log.w(CloudTable.class.getName(), "Upgrading database from version " 
				+ oldVersion + " to " + newVersion + ", which will destroy all previous data.");
		database.execSQL("DROP TABLE IF EXISTS " + TABLE_CLOUD);
		onCreate(database);
	}

}
