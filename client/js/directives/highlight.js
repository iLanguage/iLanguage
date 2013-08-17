angular.module('app')
	.directive('matlabSrcSyntaxHighlighting', function() {
		return {
			link: function(scope, element, attr) {

			var fibonacciSrc = ""
			+"arg_list = argv();\n"
			+"scale = str2num(arg_list{1});\n"
			+"iteration = str2num(arg_list{2});\n"
			+"\n"
			+"p = 0; vt = 0; vr = 0; vrt = 0; rvt = 0; RV = 0; j = 0; k = 0;\n"
			+"x2 = 0; R = 0; Rxx = 0; Ryy = 0; Rxy = 0; Ryx = 0; Rvmax = 0; f = 0;\n"
			+"\n"
			+"for i = 1:iteration\n"
			+"    x = abs(randn(scale, scale));\n"
			+"    p = size(x, 2);\n"
			+"    vt = [1:p];\n"
			+"    vr = [];\n"
			+"    RV = [1:p];\n"
			+"    for j = 1:p\n"
			+"      Rvmax = 0;\n"
			+"      for k = 1:(p-j+1)\n"
			+"        if j == 1\n"
			+"          x2 = [x, x(:, vt(k))];\n"
			+"        else\n"
			+"          x2 = [x, x(:, vr), x(:, vt(k))];\n"
			+"        end\n"
			+"        R = corrcoef(x2);\n"
			+"        Ryy = R(1:p, 1:p);\n"
			+"        Rxx = R(p+1:p+j, p+1:p+j);\n"
			+"        Rxy = R(p+1:p+j, 1:p);\n"
			+"        Ryx = Rxy';\n"
			+"        rvt = trace(Ryx*Rxy)/((trace(Ryy^2)*trace(Rxx^2))^0.5);\n"
			+"        if rvt > Rvmax\n"
			+"          Rvmax = rvt;\n"
			+"          vrt(j) = vt(k);\n"
			+"        end\n"
			+"      end\n"
			+"      vr(j) = vrt(j);\n"
			+"      RV(j) = Rvmax;\n"
			+"      f = find(vt~=vr(j));\n"
			+"      vt = vt(f);\n"
			+"    end\n"
			+"end\n"
			+"\n"
			+"% 0.14287 for scale 22 and iteration 3";

			var escoufierSrc = ""
			+"arg_list = argv();\n"
			+"scale = str2num(arg_list{1});\n"
			+"iteration = str2num(arg_list{2});\n"
			+"\n"
			+"tic;\n"
			+"p = 0; vt = 0; vr = 0; vrt = 0; rvt = 0; RV = 0; j = 0; k = 0;\n"
			+"x2 = 0; R = 0; Rxx = 0; Ryy = 0; Rxy = 0; Ryx = 0; Rvmax = 0; f = 0;\n"
			+"\n"
			+'fprintf("start %d time %.4f\n", i, toc);\n'
			+"for i = 1:iteration\n"
			+"    tic;\n"
			+"    x = abs(randn(scale, scale));\n"
			+"    p = size(x, 2);\n"
			+"    vt = [1:p];     \n"
			+"    vr = [];                                   \n"
			+"    RV = [1:p];                               \n"
			+"    for j = 1:p                                \n"
			+"      Rvmax = 0;\n"
			+"      for k = 1:(p-j+1)                        \n"
			+"        if j == 1\n"
			+"          x2 = [x, x(:, vt(k))];\n"
			+"        else\n"
			+"          x2 = [x, x(:, vr), x(:, vt(k))];     \n"
			+"        end\n"
			+"        R = corrcoef(x2);                      \n"
			+"        Ryy = R(1:p, 1:p);\n"
			+"        Rxx = R(p+1:p+j, p+1:p+j);\n"
			+"        Rxy = R(p+1:p+j, 1:p);\n"
			+"        Ryx = transpose(rxy);\n"
			+"        rvt = trace(Ryx*Rxy)/((trace(Ryy^2)*trace(Rxx^2))^0.5);\n"
			+"        if rvt > Rvmax\n"
			+"          Rvmax = rvt;                        \n"
			+"          vrt(j) = vt(k);                      \n"
			+"        end\n"
			+"      end\n"
			+"      vr(j) = vrt(j);                          \n"
			+"      RV(j) = Rvmax;                           \n"
			+"      f = find(vt~=vr(j));                     \n"
			+"      vt = vt(f);                              \n"
			+"    end\n"
			+"    timing = toc;\n"
			+'    fprintf("end of iteration %d time %.4f\n", i, timing);\n'
			+"end";



			scope.$watchCollection(attr.benchmarkName, function(newValue, oldValue){
		    	var srcToDisplay = fibonacciSrc;
		    	if (newValue.indexOf("fibonacci") > -1){
		    		srcToDisplay = fibonacciSrc;
		    	} else if (newValue.indexOf("escoufier") > -1){
		    		srcToDisplay = escoufierSrc;
		    	}
		    	element.html(srcToDisplay);
				hljs.highlightBlock(element[0]);
			    
			});
		}
		};
	});