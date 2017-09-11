# Archaea

Archaea was born of a desire to visualize the way the world stores information on Wikipedia, the most viewed .org domain in history and the most popular online source for information. This visualizer shows a completely customizable web of child articles surrounding a single parent article, effectively showing the local network of articles surrounding a chosen initial parent article.

## Tech

Archaea is built using Canvas, D3.js, the Wikipedia API, and JavaScript. To parse the data returned from the API, Archaea uses a custom-built parsing module that takes in JSON:
```
{
  "articles": [
    {
      "ns": 0,
      "exists": "",
      "*": "Harmony"
    }
  ]
}
```
The parser returns an object with the parent node (`Music`), formatted in D3 force layout notation:
```
{
  "nodes": [
    {
      "name": "Music",
      "depth": 0
    },
    {
      "name": "Harmony",
      "depth": 1
    }
  ],
  "links": [
    {
      "source": "Music",
      "target": "Harmony"
    }
  ]
}
```
 Due to the complexity of the API requests and the timing in which they are executed, this was the only way to ensure a seamless, natural user experience.

## Navigation

The physics-based D3 graph employed by Archaea provides users an intuitive way to interact with data. It uses the D3 force simulation and a custom-built drag timer to allow users to simply pull nodes to expand them. Archaea also features an article preview window with an integrated link to the Wikipedia article of the current focused node.

![Archaea Interface Screenshot](http://i.imgur.com/RdmaI3Z.jpg)





















<!--  -->
