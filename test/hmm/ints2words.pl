eval 'exec /usr/bin/perl -S $0 ${1+"$@"}'
    if 0;

#
#  Usage: ints2words.pl keyfile < infile > outfile
#
#   Takes infile sequence and replaces each number with token
#   as specified in keyfile.  Input file format is the sequence
#   file format for Kanungo's HMM package, and keyfile contains
#   number-token pairs one per line, as output by words2ints.pl.
#
#   E.g. 
#
#   --- input file ---
#     T= 7
#     1 2 3 4 1 5 3
#
#   --- output to stdout ---
#     the tall man saw the short man
#
#  Author:  Philip Resnik
#  Date:    June 24, 1998
#

#
# Handle command line arguments
#
$argc = @ARGV;
if ($argc != 1) {
    die ("Usage: ints2words.pl keyfile < infile > outfile\n");
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
	$map{$num} = $tok;
	++$linenum;
    }
    else {
	die("Line $linenum: bad format\n");
    }
}

#
# Make sure sequence from stdin starts with appropriate format
#
$firstline = <STDIN>;
if ($firstline !~ /T=\s+\d+/) {
    die("Bad format: First input line must have 'T= num'\n");
}

#
# Convert numbers on stdin to corresponding tokens, using map
#
while ($line = <STDIN>)
{
    chomp($line);
    @nums = split(/\s+/,$line);
    foreach $num (@nums)
    {
	if ($map{$num} eq "") {
	    die("Unknown item number: $num\n");
	}
	print "$map{$num} ";
    }
    print "\n";
}

