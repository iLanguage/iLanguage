eval 'exec /usr/bin/perl -S $0 ${1+"$@"}'
    if 0;

#
#  Usage: create_key.pl keyfile < infile > outfile
#
#   Takes infile and assigns a number to each unique token.
#   On exit, keyfile contains number-token mappings and outfile
#   contains number sequence corresponding to the token sequence,
#   in format suitable for Kanungo's HMM package.  (I.e. first line
#   indicates the number of items in the sequence.)
#
#   E.g. 
#
#   --- input file ---
#     the tall man saw the short man
#
#   --- output to stdout ---
#     T= 7
#     1 2 3 4 1 5 3
#
#   --- keyfile ---
#     5  short
#     1  the
#     4  saw
#     3  man
#     2  tall
#     
#
#  Author:  Philip Resnik
#  Date:    June 24, 1998
#


$argc = @ARGV;
if ($argc != 1) {
    die ("Usage: create_key.pl keyfile < infile > outfile\n");
}
$keyfile = $ARGV[0];
if (-e $keyfile) {
    die("File '$keyfile' already exists.\n");
}

$counter    = 0;
$sequence   = "";
$seq_length = 0;
while ($line = <STDIN>)
{
    chomp($line);
    @tokens = split(/\s+/,$line);
    foreach $token (@tokens)
    {
	if ($map{$token} == 0) {
	    $map{$token} = ++$counter;
	}
	$sequence .= "$map{$token} ";	
	++$seq_length;
    }
}

print "T= $seq_length\n";
print $sequence;
print "\n";

open(OUT, "> $keyfile") || die("Unable to write to '$keyfile'\n");
foreach $token (keys %map) {
    print OUT "$map{$token} \t $token\n";
}
