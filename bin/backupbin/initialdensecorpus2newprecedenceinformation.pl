#! /usr/bin/perl
#


# start the precedence relations for a template/grammar
system("cat precedencerelations_initial > precedencerelations");
system("cat precedencerelations_seedlist >> precedencerelations");


use File::ReadBackwards;

if($ARGV[0]) {
	open("STDIN", "<".$ARGV[0]);
	$infile=$ARGV[0];
}else{
	$infile="alignedcorpus-unspecified";
}

$morphlog= $infile."-morphrelations";
open("MORPHLOG",">".$morphlog);

print "\nTaking in an aligned corpus, calculating precedence relations for each (informative) word\n\n";


####################### Prepare current template ###################################

$categoryfile = File::ReadBackwards-> new ("categories")
	or die "Can't read categories: $!";
$categories_string = $categoryfile->readline();
$categories_string = &trim($categories_string);
@categories=split(/\s/,$categories_string);
&printdebug( "readbackwards \t @categories\t". scalar @categories."\n");
	#@categories=("root","medial","suffix"); #if you want to hard code it
 	#&printdebug("Perl \t @categories\t $categories". scalar @categories."\n");

my @aboveline;
unshift(@aboveline,"@");
$size = scalar @categories;
for ($j=0;$j<($size-1);$j++) {
	push(@aboveline,$categories[$j]);
	push(@aboveline,"$categories[$j]$categories[$j+1]");
}
push(@aboveline,$categories[$j]);
push(@aboveline,"@");
&printdebug ("@aboveline\n");
#@aboveline=("@", "root", "rootmedial", "medial", "medialsuffix", "suffix", "@");


while (<>){
	#print $_;
	if ($_ =~ /\+\+/){
		#&printdebug(" This line has an empty morph  ++ in it so its not the most  informative for a new template\n$_\n");
	}else{ #if its a full template
		chomp;
		$_ =~ s/\d|\+//g;
		$_ = &trim($_);
		$_="\@ $_ \@";
		&printdebug ("Remove digits and +\n");
		@morphs = split(/\s/,$_);
		&printdebug ("@morphs\n");
	
		# learn relations between morphs in that word
		$size=@morphs;
		
		if (scalar @morphs != scalar @aboveline){
			die "\n\nThere is a mismatch in the number of new categories to accomodate the more informative words of this itteration.\n\t @morphs\n\t@aboveline\n";	
		}

		for ($i=0; $i<($size-1);$i++){
			&printdebug(  "$morphs[$i] > $morphs[$i+1]\n");
			print MORPHLOG "$morphs[$i] = $aboveline[$i]\n";
		}	
	}#end if to look for long informative words
	# @aboveline=@morphs; # if you want the words to match eachother or want them to go to the category
}#end while for the file loop

close MORPHLOG;
#system("cat $morphlog");
system("sort -u < $morphlog >$morphlog-sorted "); # >> precedencerelations-$infile");
system("cat $morphlog-sorted");

pop(@aboveline);
shift(@aboveline);
$newcategories=join(" ",@aboveline);
&printdebug( $newcategories);
#system("echo $newcategories >> categories");



print "\n";

sub trim(){
	my $string = shift;
	$string =~ s/^\s+//;
	$string =~ s/\s+$//;
	return $string;
}

sub printdebug() {
	my $string = shift;
	#print $string;
}
