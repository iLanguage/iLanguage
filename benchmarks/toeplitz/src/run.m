arg_list = argv ();
scale = str2num(arg_list{1});
iteration = str2num(arg_list{2});

b = 0;
for i = 1:iteration
  b = zeros(scale, scale);
    for j = 1:scale
      for k = 1:scale
        b(k,j) = abs(j - k) + 1;
      end
    end
end

% 0.41467 for scale 220 and iteration 3