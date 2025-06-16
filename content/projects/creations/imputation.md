{
  "title": "Imputation des valeurs manquantes dans les séries temporelles d’électricité",
  "date": "2025-04-15T12:00:00",
  "range": "Janvier – Avril 2025",
  "image": "/img/skills/timeseries.png",
  "description": "Comparaison de méthodes statistiques, ML et deep-learning pour combler les valeurs manquantes de relevés de consommation électrique résidentielle.",
  "tags": ["Time Series","Machine Learning","Deep Learning"],
  "fact": "",
  "featured": false
}

Ce projet consiste à combler les valeurs manquantes dans des séries temporelles de consommation électrique résidentielle, mesurées toutes les 30 minutes. Nous disposons de 3 127 séries d’entraînement de 12 864 relevés chacune, sans valeurs manquantes, puis de jeux de test comportant environ 30 % de mesures masquées aléatoirement. Pour restaurer ces données, nous avons implémenté et comparé plusieurs approches : méthodes statistiques classiques (interpolations, moyennes mobiles), algorithmes de machine learning (régressions, forêts aléatoires) et modèles de deep learning (LSTM, CNN, autoencodeurs). Chaque méthode est évaluée à l’aide de l’erreur moyenne absolue (MAE) entre les valeurs prédictes et réelles, afin de déterminer la solution la plus efficace pour reconstituer fidèlement les courbes de consommation.

Auteur: Ilyes Khedhiri , Muzzammil Mougamadou