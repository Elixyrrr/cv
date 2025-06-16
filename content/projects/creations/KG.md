{
  "title": "Évaluation de la qualité d’un graphe de connaissance avec un pipeline RAG",
  "date": "2025-05-31",
  "range": "Janvier – Mai 2025",
  "image": "/img/skills/rag.png",
  "description": "Mise en place d’un pipeline Retrieval-Augmented Generation (RAG) pour fact-checker automatiquement un graphe de connaissance à l’aide de grands modèles de langue (LLMs).",
  "tags": [
    "LLM",
    "RAG",
    "Knowledge Graph",
    "LangChain",
    "FAISS",
    "MongoDB",
    "Deep Learning",
    "NLP",
    "Ollama"
  ],
  "featured": true
}


## Contexte et objectifs

Nous avons implémenté un pipeline **Retrieval-Augmented Generation (RAG) avec LangChain et en local** afin d’enrichir les prompts d’un LLM à partir d’un Graphe de Connaissance pour réduire les hallucinations et améliorer la précision factuelle.  

## Stack technique
Pour ce faire on a utilisé:

- **LangChain & LangGraph** pour l’orchestration du pipeline et la recherche a similarité vectorielle
- **FAISS** + `all-mpnet-base-v2` pour l’indexation vectorielle des triplets  
- **MongoDB** pour la gestion initiale des données  
- **Ollama** (Mistral, Llama3) pour l’inférence LLM en local  
- **Cross-Encoder MS MARCO** pour le reranking  
- **RoBERTa NLI** pour le scoring d’inférence logique  


![](/img/skills/pipeline.png#floatright)

## Pipeline RAG

1. **Recherche par similarité vectorielle**  
   - Encodage des triplets  
   - Récupération des k voisins les plus proches (FAISS)  
2. **Reranking** : Cross-Encoder MS MARCO  
3. **Reformulation** : Conversion des triplets validés en phrases naturelles  
4. **NLI** : Calcul de la probabilité d’inférence (RoBERTa)  
5. **Génération** : Verdict “vrai/faux” par LLM (temperature = 0)  

## Points Forts

- **Pertinence** : Décision d'utiliser ou non le contexte suivant le score d'inférence NLI  
- **Hallucinations** : Réduction de l'hallucination grace au contexte envoyé  
- **Stabilité** : Un gain de performance sur des milliers de triplets testés (dataset à 5000 triplets)

## Point Faible
- **Complexité** : Executer ce projet à un coût considérable suivant le nombre de documents qu'on cherche à utiliser comme contexte.


## Retour d’expérience no-code

Lors de l’événement **[IA Innovation](https://www.ai4europe.eu/)**, j'ai pu accéder à leur tool **[AI-builder](https://aiexp.ai4europe.eu/)** pour créer différents pipelines de RAG et évaluer leur efficacité sans aucune ligne de code à l'aide de **[Graphene](https://projects.eclipse.org/projects/technology.graphene)**
![](/img/skills/rag_nocode.png#floatbottom)

Auteur: Ilyes Khedhiri