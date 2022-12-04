<script>
  let init = false;
  import yarnLogo from "/yarn.png";
  import menu from "./assets/menu.png";
  import { createGitgraph } from "@gitgraph/js";
  import { onMount } from "svelte";
  import { Tree } from "./demodata";

  let REPO_PATH = "https://github.com/JohanWranker/ArtiGraph";

  function initGraph() {
    // Get the graph container HTML element.
    const graphContainer = document.getElementById("graph-container");

    // Instantiate the graph.
    const gitgraph = createGitgraph(graphContainer, {
      mode: null /*"compact"*/,
    });

    // Simulate git commands with Gitgraph API.
    var t = new Tree();
    var branch = t.GetRoot();
    const master = gitgraph.branch(branch);
    var data = null;

    while (true) {
      data = t.GetNext(branch);
      if (data == null) {
        break;
      }
      master.commit(data);
    }

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
  <div style="align-items: left;">
    <img src={menu} class="logo" alt="Menu" />
    <img href={REPO_PATH} src={yarnLogo} class="logo" alt="Logo" />
    <a class="logo" href={REPO_PATH}>README</a>
    <button>Fetch</button>
  </div>
  <div id="graph-container" />
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
</style>
