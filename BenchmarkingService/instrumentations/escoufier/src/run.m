arg_list = argv();
scale = str2num(arg_list{1});
iteration = str2num(arg_list{2});

execCounter = zeros(44,1);
timings = zeros(iteration + 1, 1);
tic;
p = 0; vt = 0; vr = 0; vrt = 0; rvt = 0; RV = 0; j = 0; k = 0; execCounter(7,1) = execCounter(7,1) + 1;
x2 = 0; R = 0; Rxx = 0; Ryy = 0; Rxy = 0; Ryx = 0; Rvmax = 0; f = 0; execCounter(8,1) = execCounter(8,1) + 1;

timings(1, 1) = toc;
for i = 1:iteration
    tic;
    x = abs(randn(scale, scale)); execCounter(13,1) = execCounter(13,1) + 1;
    p = size(x, 2); execCounter(14,1) = execCounter(14,1) + 1;
    vt = [1:p]; execCounter(15,1) = execCounter(15,1) + 1;
    vr = []; execCounter(16,1) = execCounter(16,1) + 1;                                  
    RV = [1:p]; execCounter(17,1) = execCounter(17,1) + 1;                              
    for j = 1:p                                
      Rvmax = 0; execCounter(19,1) = execCounter(19,1) + 1;
      for k = 1:(p-j+1)                        
        if j == 1 
          x2 = [x, x(:, vt(k))]; execCounter(22,1) = execCounter(22,1) + 1;
        else
          x2 = [x, x(:, vr), x(:, vt(k))]; execCounter(24,1) = execCounter(24,1) + 1;
        end
        R = corrcoef(x2);  execCounter(26,1) = execCounter(26,1) + 1;                    
        Ryy = R(1:p, 1:p); execCounter(27,1) = execCounter(27,1) + 1;
        Rxx = R(p+1:p+j, p+1:p+j); execCounter(28,1) = execCounter(28,1) + 1;
        Rxy = R(p+1:p+j, 1:p); execCounter(29,1) = execCounter(29,1) + 1;
        Ryx = transpose(Rxy); execCounter(30,1) = execCounter(30,1) + 1;
        rvt = trace(Ryx*Rxy)/((trace(Ryy^2)*trace(Rxx^2))^0.5); execCounter(31,1) = execCounter(31,1) + 1;
        if rvt > Rvmax
          Rvmax = rvt; execCounter(33,1) = execCounter(33,1) + 1;
          vrt(j) = vt(k); execCounter(34,1) = execCounter(34,1) + 1;
        end
      end
      vr(j) = vrt(j); execCounter(37,1) = execCounter(37,1) + 1;                         
      RV(j) = Rvmax; execCounter(38,1) = execCounter(38,1) + 1;                          
      f = find(vt~=vr(j)); execCounter(39,1) = execCounter(39,1) + 1;                     
      vt = vt(f); execCounter(40,1) = execCounter(40,1) + 1;                             
    end
    timings(i+1, 1) = toc;
end

fprintf("<json>");
for i = 1:iteration+1
  if i == 1
    fprintf("{\"times\": [");
  end
  if i == iteration+1
    fprintf("{\"iteration\": %d, \"time\": %.7f }", i-1, timings(i, 1));
  else
    fprintf("{\"iteration\": %d, \"time\": %.7f },", i-1, timings(i, 1));
  end
  if i == iteration+1
    fprintf("],");
  end
end

for i = 1:44
  if i == 1
    fprintf("\"lines\":[");
  end
  if i == 44
    fprintf("{\"line\": %d, \"executed\": %d }", i, execCounter(i, 1));
  else 
    fprintf("{\"line\": %d, \"executed\": %d },", i, execCounter(i, 1));
  end
  if i == 44
    fprintf("]}");
  end
end
fprintf("</json>");
