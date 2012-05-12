eval 'exec /usr/bin/perl -S $0 ${1+"$@"}'
    if 0;

#
#  Usage: viewhmm.pl file.hmm file.key trans-threshold emit-threshold
#
#  Outputs transition matrix for an FSA approximately like
#  the HMM, by including transitions with probability greater
#  than threshold. The resulting FSA provides a way to visualize 
#  the (likely) behavior of the HMM.
#

#
# Handle command line arguments
#
$argc = @ARGV;
if ($argc != 4) {
 die ("Usage: viewhmm.pl file.hmm file.key trans-threshold emit-threshold\n");
}
$hmmfile        = $ARGV[0];
$keyfile        = $ARGV[1];
$transthreshold = $ARGV[2];
$emitthreshold  = $ARGV[3];


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



open(HMM, "< $hmmfile") || die("Unable to read $hmmfile\n");
$line = <HMM>;
($M) = ($line =~ /M= (\d+)/);
$line = <HMM>;
($N) = ($line =~ /N= (\d+)/);
$line = <HMM>;
$line =~ /A:/                 || die("Bad format at A in $hmmfile\n");

# Read the A matrix, 
print "\n";
for ($i = 0; $i < $N; ++$i) 
{ 
    $state = $i + 1;		# state numbering starts from 1, not 0
    print "Transitions from State $state:\n"; 
    $line = <HMM>; 
    chomp($line);
    @probs = split(/\s+/, $line);
    for ($j = 0; $j < $N; ++$j) 
    {
	$dest = $j + 1;		# state numbering starts from 1, not 0
	if ($probs[$j] > $transthreshold) {
	    print "  $dest \t $probs[$j]\n";
	}
    }
    print "\n";
} 

# Read the B matrix and show symbols emitted with prob > threshold
$line = <HMM>;
$line =~ /B:/                 || die("Bad format for B in $hmmfile\n");
for ($i = 0; $i < $N; ++$i) 
{
    $state = $i + 1;		# state numbering starts from 1, not 0
    print "Symbols emitted at State $state:\n";
    $line = <HMM>;
    chomp($line);
    @probs = split(/\s+/, $line);

    for ($j = 0; $j < $M; ++$j) 
    {
	if ($probs[$j] > $emitthreshold) {
	    push(@symbols, $j);
	}
    }
    @sorted_symbols = sort byprob @symbols;

    foreach $symbol (@sorted_symbols) {
	# Note: word numbering starts at 1, not 0
	$wordnum = $symbol+1;
	$word    = $map{$wordnum};
	print "  $probs[$symbol] \t $wordnum \t $word\n";
    }
    print "\n";
    undef(@symbols);
}

# Read the initial probabilities
$line = <HMM>;
die("Bad format for pi in $hmmfile\n") if $line !~ /pi:/;
$line = <HMM>;
chomp($line);
@probs = split(/\s+/, $line);
for ($j = 0; $j < $N; ++$j) {
    if ($probs[$j] > 0.01) {
	$state = $j + 1;	# state numbering starts from 1, not 0
	print "Initial probability of State $state: $probs[$j]\n";
    }
}
print "\n";




sub byprob { $probs[$b] <=> $probs[$a]; }

