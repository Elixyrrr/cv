{
  "title": "Évaluation de la qualité d’un graphe de connaissance avec un pipeline RAG",
  "date": "2025-05-31",
  "range": "Janvier – Mai 2025",
  "image": "/img/skills/rag.png",
  "description": "Mise en place d’un pipeline Retrieval-Augmented Generation (RAG) pour fact-checker automatiquement un graphe de connaissance à l’aide de grands modèles de langue (LLMs).",
  "tags": ["LLM", "RAG", "Knowledge Graph", "LangChain", "FAISS", "MongoDB", "Deep Learning","NLP"],
  "featured": true
}

RAG (Retrieval-Augmented Generation) « <em>est une méthode qui enrichit les prompts du LLM avec un contexte pertinent récupéré pour réduire les hallucinations et améliorer la précision factuelle.</em> »  .Dans ce projet on utilise Ollama pour exécuter un LLM local qui, à partir de triplets récupérés par FAISS depuis un graphe de connaissance, va évaluer la qualité du graphe en comparant les réponses générées aux données sources.









