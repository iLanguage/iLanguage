eval 'exec /usr/bin/perl -S $0 ${1+"$@"}'
    if 0;

#
#  Usage: words2seq.pl keyfile < infile > outfile
#
#   Takes words on infile and creates an input sequence in 
#   file format for Kanungo's HMM package.  Keyfile must contains
#   number-token pairs one per line, as output by create_key.pl,
#   and words on infile must be in the keyfile.
#
#   Note: stores entire sequence in memory; intended only for
#   short (e.g. sentence or paragraph length) sequences.
#
#   E.g. 
#
#   --- input ---
#     the tall man saw the short man
#
#   --- output ---
#     T= 7
#     1 2 3 4 1 5 3
#
#
#  Author:  Philip Resnik
#  Date:    June 26, 1998
#

#
# Handle command line arguments
#
$argc = @ARGV;
if ($argc != 1) {
    die ("Usage: words2seq.pl keyfile < infile > outfile\n");
}
$keyfile = $ARGV[0];

#
# Read keyfile, creating map from numbers to tokens
#
open(IN, "< $keyfile") || die("Unable to read file '$keyfile'\n");
$linenum = 1;
while ($line = <IN>)
{
    if (($num,$tok) = ($line =~ /(\d+)\s+(.*)/)) {
	$map{$tok} = $num;
	++$linenum;
    }
    else {
	die("Line $linenum: bad format\n");
    }
}



#
# Convert tokens on stdin to corresponding numbers, using map
#
$counter = 0;
$output  = "";
while ($line = <STDIN>)
{
    chomp($line);
    @toks = split(/\s+/,$line);
    foreach $tok (@toks)
    {
	if ($map{$tok} eq "") {
	    die("Unknown token in input: '$tok'\n");
	}
	$output .= "$map{$tok} ";
	++$counter;
    }
}

# Output everything
print "T= $counter\n";
print "$output\n";

