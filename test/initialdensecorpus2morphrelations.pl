#! /usr/bin/perl
#
$language="inuktitut";
#use File::ReadBackwards;

if($ARGV[0]) {
	open("STDIN", "<".$ARGV[0]);
	$infile=$ARGV[0];
}else{
	$infile="alignedcorpus-unspecified";
}

$morphfrequency= $language."-morphrelations-frequency";
$morphlog= $language."-morphrelations-history";
open("MORPHLOG",">>".$morphlog);

print "\nTaking in an aligned corpus, calculating precedence relations between morphemes for each (informative) word\n\n";

while (<>){
	#&printdebug( $_);
	if ($_ =~ /\+\+/){
		&printdebug(" This line has an empty morph  ++ in it so its not the most informative for a new template\n\t$_\n");
	}#else{ #if its a full template
		chomp;
		$_ =~ s/\d|\+//g;
		$_ = &trim($_);
		$_="\@ $_ \@";
		&printdebug ("Remove digits and +\n");
		@morphs = split(/\s+/,$_);
		&printdebug ("@morphs\n");
	
		# learn relations between morphs in that word
		$size=@morphs;
		for ($i=0; $i<($size-1);$i++){
			print MORPHLOG "$morphs[$i] > $morphs[$i+1]\n";
			&printdebug( "$morphs[$i] > $morphs[$i+1]\n");
		}	
	#}#end if to look for long informative words
}#end while for the file loop

close MORPHLOG;
#system("cat $morphlog");
print "    A memory of all encountered precedence relations between individual morphemes is kept in $morphlog\n";
system("sort < $morphlog | uniq -c  >$morphfrequency "); 

print "    Precedence information between individual morphemes was generalized with frequnecy counts in the $morphfrequency file.\n";
system("cat $morphfrequency");


print "\n";

sub trim(){
	my $string = shift;
	$string =~ s/^\s+//;
	$string =~ s/\s+$//;
	return $string;
}

sub printdebug() {
	my $string = shift;
	print $string;
}
