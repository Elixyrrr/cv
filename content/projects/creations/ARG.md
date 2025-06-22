{
  "title": "Arg-Solver : Résolution d'extensions d'argumentation",
  "date": "2025-01-15",
  "range": "Septembre 2024 – Janvier 2025",
  "image": "/img/skills/arg.png",
  "description": "Implémentation d’un solveur Python pour les Abstract Argumentation Frameworks : calcul et décision d’extensions complètes et stables, ainsi que vérification de crédulité et scepticisme.",
  "tags": [
    "Argumentation Theory",
    "Abstract Argumentation",
    "Logic Programming",
    "Computational Argumentation",
    "Graph",
    "Semantic Extensions"
  ],
  "featured": false
}

## Contexte et objectifs
Ce projet sert à résoudre les Abstract Argumentation Frameworks (AAF). Il calcule les extensions et détermine l’acceptabilité des arguments selon les sémantiques complète et stable:  
- Lire un AF F = ⟨A,R⟩ au format `.txt`  
- Résoudre :  
  - **SE-CO** : retourner une extension complète (Some Extension)  
  - **DC-CO** : tester la crédulité (Decide Credulous)  
  - **DS-CO** : tester le scepticisme (Decide Skeptical)  
  - **SE-ST**, **DC-ST**, **DS-ST** pour la sémantique stable  
  - Interface CLI conforme au sujet : 
    python arg.py -p XX-YY -f system.txt [-a argument]
 

## Utilisation
```bash
git clone https://github.com/Elixyrrr/ArgSolver.git
cd ArgSolver
python arg.py -p SE-CO -f system.txt
python arg.py -p DC-ST -f system.txt -a a
```

## Conclusion & perspectives
- Solution Python claire, modulaire, conforme au sujet académique.  
- Futures extensions :  sémantiques grounded et ideal  
- Parallélisation des calculs pour gros frameworks (> 1 000 arguments)  
- GUI interactive pour visualisation des AAF et de leurs extensions  
- Utilisation d'un SATSolver

## Bibliographie
1. P. M. Dung, “On the acceptability of arguments and its fundamental role in nonmonotonic reasoning, logic programming, and n-person games,” Artificial Intelligence, vol. 77, no. 2, pp. 321–358, 1995.  
2. J. Delobelle, Fusion de systèmes d’argumentation, Université d’Artois, 2014.  

Auteur: Ilyes Khedhiri

