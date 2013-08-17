arg_list = argv();
scale = str2num(arg_list{1});
iteration = str2num(arg_list{2});

p = 0; vt = 0; vr = 0; vrt = 0; rvt = 0; RV = 0; j = 0; k = 0;
x2 = 0; R = 0; Rxx = 0; Ryy = 0; Rxy = 0; Ryx = 0; Rvmax = 0; f = 0;

for i = 1:iteration
    x = abs(randn(scale, scale));
    p = size(x, 2);
    vt = [1:p];     
    vr = [];                                   
    RV = [1:p];                               
    for j = 1:p                                
      Rvmax = 0;
      for k = 1:(p-j+1)                        
        if j == 1
          x2 = [x, x(:, vt(k))];
        else
          x2 = [x, x(:, vr), x(:, vt(k))];     
        end
        R = corrcoef(x2);                      
        Ryy = R(1:p, 1:p);
        Rxx = R(p+1:p+j, p+1:p+j);
        Rxy = R(p+1:p+j, 1:p);
        Ryx = transpose(Rxy);
        rvt = trace(Ryx*Rxy)/((trace(Ryy^2)*trace(Rxx^2))^0.5);
        if rvt > Rvmax
          Rvmax = rvt;                        
          vrt(j) = vt(k);                      
        end
      end
      vr(j) = vrt(j);                          
      RV(j) = Rvmax;                           
      f = find(vt~=vr(j));                     
      vt = vt(f);                              
    end
end

fprintf("Hello");
% 0.14287 for scale 22 and iteration 3