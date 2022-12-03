<script>
  let init = false;
  import yarnLogo from "./assets/yarn.png";
  import menu from "./assets/menu.png";
  import { createGitgraph } from "@gitgraph/js";
  import { onMount } from "svelte";

  function initGraph() {
    // Get the graph container HTML element.
    const graphContainer = document.getElementById("graph-container");

    // Instantiate the graph.
    const gitgraph = createGitgraph(graphContainer);

    // Simulate git commands with Gitgraph API.
    const master = gitgraph.branch("master");
    master.commit("Initial commit");
    master.commit({
      subject: "Add feature",
      body: "More details about the feature…",
      dotText: "❤️",
      tag: "v1.2",
      style: {
        // Specific style for this commit
      },
      hash: "Build22",
    });

    const develop = gitgraph.branch("develop");
    develop.commit("Add TypeScript");

    const aFeature = gitgraph.branch("a-feature");
    aFeature
      .commit("Make it work")
      .commit("Make it right")
      .commit("Make it fast");

    develop.merge(aFeature);
    develop.commit("Prepare v1");

    master.merge(develop).tag("v1.0.0");
  }

  onMount(async () => {
    initGraph();
  });
</script>

<main>
  <div >
    <a href="https://svelte.dev" target="_blank" rel="noreferrer">
      <img src={yarnLogo} class="logo" alt="Logo" />
    </a>
    <a href="https://github.com/JohanWranker/ArtiGraph" class="read-the-docs">README</a>
    <img src={menu} class="logo" alt="Menu"/>

  </div>

  <button on:click={initGraph}> ggg </button>

  <div id="graph-container" />
  <h1>Vite + Svelte</h1>

  <p>
    Check out <a
      href="https://github.com/sveltejs/kit#readme"

      target="_blank"
      rel="noreferrer">SvelteKit</a
    >, the official Svelte app framework powered by Vite!
  </p>

  <a href="https://github.com/JohanWranker/ArtiGraph" class="read-the-docs">README</a>
</main>

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  }
</style>
