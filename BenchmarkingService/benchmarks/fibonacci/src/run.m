correct = [1 1 2 3 5 8 13 21 34 55 89 144 233 377 610 987 1597 2584 4181 6765 10946 17711 28657 46368 75025 121393 196418 317811 514229 832040 1346269 2178309 3524578 5702887 9227465 14930352 24157817 39088169 63245986 102334155];

arg_list = argv();
scale = str2num(arg_list{1});
iteration = str2num(arg_list{2});

% Fibonacci.m by David Terr, Raytheon, 5-11-04

function fib = Fibonacci(n)

if ( n ~= floor(n) )
    error('Argument must be an integer.');
    return;
end

if ~isreal(n)
    error('Argument must be an integer.');
    return;
end

if size(n,1) ~= 1 || size(n,2) ~= 1
    error('Argument must be an integer.');
    return;
end

if ( n == 0 )
    fib = 0;
    return;
end

if ( n == 1 )
    fib = 1;
    return;
end

if ( n < 0 )
    fib = (-1)^(n+1) * Fibonacci(-n);
    return;
end

fib = Fibonacci(n-1) + Fibonacci(n-2);

end


for n = 1:iteration
    value = Fibonacci(scale);
    if ((correct(scale) != value)) 
        exit(1);
    end
end
exit(0);

