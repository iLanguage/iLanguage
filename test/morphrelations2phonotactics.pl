#!/usr/bin/perl -w
#
$language="inuktitut";
#
if($ARGV[0]) {
	open("STDIN", "<".$ARGV[0]);
	$infile=$ARGV[0];
}else{
	$infile="alignedcorpus-unspecified";
}

$interphonotacticslog = $language."-phonotactics-intermorpheme_precedence-history";
$interphonotactics =$language."-phonotactics-intermorpheme_precedence-sorted";
#$phonointra = phonotactics-intramorpheme_precedence;
open("INTERMORPH",">>".$interphonotacticslog);
#open("INTRAMORPH",">>".$phonointra);



while (<>) {
	&printdebug("Working on this line $_");
	$_ =~ s/^\s*\d*\s*//;
	&printdebug("Remove frequency information $_");
	@pair = split(/ *> */,$_);
	$last = substr($pair[0],-1,1);
	$first = substr($pair[1],0,1);
	&printdebug("This $last  is the last char of the first word $pair[0]\n");
	&printdebug("This $first  is the first char of the  second word $pair[1]\n");
	
	&printdebug("$last > $first\n");
	print INTERMORPH "$last > $first\n";


}#end while to add new phonological precedenec at word boundaries


close INTERMORPH;
system("sort -u < $interphonotacticslog > $interphonotactics");
system("cat $interphonotactics");


sub printdebug() {
	my $string = shift;
	print $string;
}
