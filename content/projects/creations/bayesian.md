{
  "title": "Bayesian Database – Application Big Data",
  "date": "2025-05-15",
  "range": "Janvier – Avril 2025",
  "encadrants": ["Dragutin Jastrebic", "Koviljka"],
  "categories": ["app. scientifique"],
  "image": "/img/skills/bigdata.png",
  "description": "Conception et prototypage d’un logiciel Big Data (« Bayesian Database ») pour collecter, distribuer et analyser de grands volumes de données hétérogènes via Hadoop et Machine Learning.",
  "tags": ["Big Data", "Hadoop", "Machine Learning", "Bayesian Network", "Spark", "Hive"],
  "featured": false
}

## Contexte & objectifs

Les bases de données traditionnelles (Oracle, SQL Server, DB2) offrent de l’ACID et un accès concurrent, mais sont lentes pour le traitement de très gros volumes non structurés.  
Hadoop, grâce au sharding et à HDFS/MapReduce, distribue le calcul sur plusieurs nœuds pour traiter massivement des données.  
L'objectif étant développer un prototype de « Bayesian Database » capable de collecter et d’analyser les données d’entreprise en combinant Hadoop avec des méthodes de Machine Learning bayésien.

## Stack technique

- **Langages & framework Web** : JavaScript, React, HTML/CSS, Flask (Python)  
- **Base de données & Big Data** : PostgreSQL, Hadoop (HDFS/MapReduce), Hive (ou Cassandra)  
- **Machine Learning & Bayésien** : Scikit-Learn (Lasso & Ridge), NetworkX (réseaux bayésiens), Spark MLlib  

## Réalisation
1. **Architecture distribuée** – Ingestion et sharding des données via HDFS  
2. **Moteur bayésien** – Modélisation et inférence de réseaux bayésiens avec NetworkX  
3. **Méthodes de régression** – Implémentation de Lasso et Ridge pour extraire la structure des relations statistiques  
4. **Indépendance conditionnelle** – Exécution de procédures SQL pour tester les dépendances entre variables  
5. **Visualisation interactive** – Interface NetworkX intégrée au frontend React pour afficher et manipuler graphiquement les relations ![](/img/skills/graphb.png#floatrightb)

## Points forts

- **Scalabilité** : Traitement distribué de To de données  
- **Bayésien & régularisation** : Combinaison de modèles probabilistes et de régression pénalisée  
- **Visualisation** : Exploration interactive des réseaux via NetworkX  

## Points faibles

- **La suite d'un projet** : Nécessité d’appréhender et d’adapter une architecture complexe pour poursuivre le développement.
