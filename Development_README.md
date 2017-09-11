# Archaea

### Background
Archaea was born of a desire to visualize the way the world stores information on Wikipedia, the most viewed .org domain in history and the most popular online source for information. Using this visualizer, users will be able to view a completely customizable web of child articles surrounding a single parent article, view the header photo for each article, and view a preview of the current parent node article content in an embedded view.

### Functionality and MVP

The visualization begins when a user searches for a single article, and continues as the user clicks nodes born of the parent article's most popular embedded hyperlinks. Nodes display in a web and child nodes can have multiple parents.

With this visualizer, users will be able to:
- Choose a seed node by searching for an article.
- Extend the web of nodes in any direction by clicking child nodes.
- Zoom in and out on the entire view.
- See a short preview of the latest parent node article.

This project will also include:
- A suitably styled UI, with prompts to assist user input.
- A production README.

### Wireframes

The design of Archaea will be minimal. It will consist of a single screen with a search bar, an article preview window, a button to clear the screen, and a few instructions for navigation.

### Implementation Timeline

**Day 1**: Build main page component and search using Wikipedia API. Study D3.
  - Render main page and placeholder buttons with React
  - Wire Wikipedia API to search bar
  - Successfully fetch the top ten hyperlinked articles from a given article using the Wikipedia API
  - Begin learning the necessary parts of D3 and SVG

**Day 2**: Initial D3 setup and render.
  - Render web-like D3 object in React component
  - Implement reset button
  - Wire Wikipedia API results to D3 object

**Day 3**: Fully implement D3 graph.
  - Implement clickable nodes to expand web
  - Implement zoom
  - Write control instructions for sidebar

**Day 4**:
  - Implement missing features
  - Fix remaining bugs

### Bonus Features

  - Create new mode in which users can choose an initial node and have it load a few thousand relations. This mode would use graphic-only, procedurally rendered nodes to show a larger shape rather than remain as interactive as the initial, more interactive mode.








<!-- asdf -->
