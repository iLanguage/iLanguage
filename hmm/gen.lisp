
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;;;
;;;  Generate at random from a simple grammar
;;;
;;;    Top level call:  (generate-sentences n)
;;;    where n is the desired number of sentences.
;;;
;;;    Optionally: (generate-sentences n *grammarN*)
;;;    for some grammar *grammarN*.
;;;
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defun generate-sentences (num &optional (grammar *grammar1*))
  (dotimes (i num num) (gen 's grammar)))

(defun gen (symbol &optional (grammar *grammar1*))
  (let* ((rules    (assoc symbol grammar))
	 (rhslist  (rest rules))
	 (rhslen   (length rhslist))
	 rhs)
    (cond ((null rules)
	   ;; if a terminal symbol, just add to sentence
	   (format t "~A " symbol))
        ;; otherwise, pick a RHS at random and recurse
	  (t
	   (setf rhs (nth (random rhslen) rhslist))
	   (mapcar #'(lambda (symbol) (gen symbol grammar)) rhs))))
  t)




;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;;; Some simple English-like grammars
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

;;; Simple grammar with 36 terminal symbols.
(defparameter *grammar1* 
  '( (S    (NP VP ".") (Who VP "?"))
     (NP   (DET N) (DET ADJ N) (NP PP) (all DET N) (some of DET N))
     (VP   (VPT) (VPI))
     (VP   (VPT) (VPI) (VP PP))
     (VPT  (VT NP))
     (VPI  (VI))
     (PP   (P NP))

     (DET (the) (those) (these))
     (N   (men) (women) (children) (cookies) (fences) (songs) (guitars))
     (VI  (slept) (sang) (cried) (laughed) (jumped) (cooked) (played))
     (VT  (saw) (liked) (tickled) (cooked) (played) (played with)
	  (ignored) (sang) (sang to))
     (ADJ (tall) (short) (nice) (happy))
     (P   (with) (near) ("NEXT TO") (for))))

;;; Simpler grammar with small number of terminal symbols
(defparameter *grammar2* 
  '( (S    (NP AUX VP ".") (Who AUX VP "?"))
     (NP   (DET N) (DET ADJ N))
     (VP   (VPT) (VPI))
     (VPT  (VT NP))
     (VPI  (VI))

     (DET (the) (a))
     (N   (plane) (fly) (can))
     (AUX (can) (might))
     (VI  (fly) (see))
     (VT  (fly) (see) (destroy))
     (ADJ (typical) (large))))
