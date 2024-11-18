// Global Variables
let expandAllTriggered = false;
let recognition;
let isListening = false;

// Utility Functions
function autoExpand(textarea) {
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
}

function filterThreats(selectedLikelihood, selectedSeverity) {
    const tree = $("#retrieved-entries").jstree(true);
    tree.show_all();
    if (selectedLikelihood === "All" && selectedSeverity === "All") {
        if (expandAllTriggered) {
            tree.open_all();
        }
        return;
    }
    tree.get_json("#", { flat: true }).forEach(node => {
        if (node.data && node.data.hasOwnProperty("likelihood") && node.data.hasOwnProperty("severity")) {
            const likelihood = node.data.likelihood;
            const severity = node.data.severity;
            const likehoodMatch = (selectedLikelihood === "All" || likelihood === selectedLikelihood);
            const severityMatch = (selectedSeverity === "All" || severity === selectedSeverity);
            if (!likehoodMatch || !severityMatch) {
                tree.hide_node(node.id);
            }
            if (expandAllTriggered) {
                tree.open_all();
            }
        }
    });
}

function setupTreeView(data) {
    if ($("#retrieved-entries").jstree(true)) {
        $("#retrieved-entries").jstree("destroy").empty();
    }
    const treeData = {
        "core": {
          "data": data,
          "check_callback": true,
          "themes": {
            "icons": false
          }
        },
        "plugins": ["search", "contextmenu"],
        "search": {
            "show_only_matches": true
        },
        "contextmenu": {
            "items": function ($node) {
                return {
                    "Create": {
                        "label": "Create Node",
                        "action": function () {
                            $("#retrieved-entries").jstree("create_node", $node, { "text": "New Node" }, "last");
                        }
                    },
                    "Rename": {
                        "label": "Rename Node",
                        "action": function() {
                            $("#retrieved-entries").jstree("edit", $node);
                        }
                    },
                    "Delete": {
                        "label": "Delete Node",
                        "action": function () {
                            $("#retrieved-entries").jstree("delete_node", $node);
                        }
                    }
                };
            }
        }
    };
    $("#retrieved-entries").jstree(treeData);
}

// Initial UI Setup
document.getElementById("overview-explanation").style.background = "lightcyan";
document.getElementById("overview-explanation").style.borderLeftColor = "lightblue";

// Microphone Button Handler
const micButton = document.getElementById("mic-button");
micButton.addEventListener("click", function() {
    if (!("webkitSpeechRecognition" in window)) {
        alert("Your browser does not support speech recognition.");
        return;
    }
    if (!recognition) {
        recognition = new webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.lang = "en-US";
        recognition.onresult = (event) => {
            let transcript = "";
            for (let i = event.resultIndex; i < event.results.length; i++) {
                transcript += event.results[i][0].transcript.trim() + ". ";
            }
            document.getElementById("system-description").value += transcript;
        };
        recognition.onerror = (event) => {
            micButton.classList.remove("listening");
            recognition.stop();
            isListening = false;
            console.error("Error during speech recognition: ", event.error);
        }
        recognition.onend = (event) => {
            micButton.classList.remove("listening");
            isListening = false;
        }
    }
    if (isListening) {
        micButton.classList.remove("listening");
        recognition.stop();
        isListening = false;
    } else {
        micButton.classList.add("listening");
        recognition.start();
        isListening = true;
    }
});

// Decompose System Button Handler
const decomposeButton = document.getElementById("decompose-button");
decomposeButton.addEventListener("click", function() {
    decomposeButton.innerText = "Decomposing system...";
    document.getElementById("decompose-explanation").style.background = "lightcyan";
    document.getElementById("decompose-explanation").style.borderLeftColor = "lightblue";
    document.getElementById("decompose-spinner").style.display = "block";
    document.getElementById("step-2").scrollIntoView({
        behavior: "smooth"
    });
    const systemDescription = document.getElementById("system-description").value;
    fetch("/decompose_system", {
        method: "POST",
        headers: {
            "Content-Type": "text/plain",
        },
        body: systemDescription,
    })
    .then(response => response.text())
    .then(data => {
        decomposeButton.innerText = "Retry system decomposition";
        document.getElementById("decompose-spinner").style.display = "none";
        document.getElementById("decompose-label").classList.remove("hidden");
        document.getElementById("decomposed-system").classList.remove("hidden");
        document.getElementById("decomposed-system").innerText = data;
        document.getElementById("identify-button").classList.remove("hidden");
        document.getElementById("step-2").scrollIntoView({
            behavior: "smooth"
        });
    })
    .catch(error => {
        console.error("Error during system decomposition: ", error);
        decomposeButton.innerText = "Retry system decomposition";
        document.getElementById("decompose-spinner").style.display = "none";
        document.getElementById("decomposed-system").classList.remove("hidden");
        document.getElementById("decomposed-system").innerText = "There was an error. Please try again.";
        document.getElementById("step-2").scrollIntoView({
            behavior: "smooth"
        });
    });
});

// Identify Threats Button Handler
const identifyButton = document.getElementById("identify-button");
identifyButton.addEventListener("click", function() {
    identifyButton.innerText = "Identifying threats...";
    document.getElementById("identify-explanation").style.background = "lightcyan";
    document.getElementById("identify-explanation").style.borderLeftColor = "lightblue";
    document.getElementById("identify-spinner").style.display = "block";
    document.getElementById("step-3").scrollIntoView({
        behavior: "smooth"
    });
    const decomposedSystem = document.getElementById("decomposed-system").innerText;
    fetch("/identify_threats", {
        method: "POST",
        headers: {
            "Content-Type": "text/plain",
        },
        body: decomposedSystem,
    })
    .then(response => response.text())
    .then(data => {
        identifyButton.innerText = "Retry threat identification";
        document.getElementById("identify-spinner").style.display = "none";
        document.getElementById("identify-label").classList.remove("hidden");
        document.getElementById("identified-threats").classList.remove("hidden");
        document.getElementById("identified-threats").innerText = data;
        document.getElementById("retrieve-button").classList.remove("hidden");
        document.getElementById("step-3").scrollIntoView({
            behavior: "smooth"
        });
    })
    .catch(error => {
        console.error("Error during threat identification: ", error);
        identifyButton.innerText = "Retry threat identification";
        document.getElementById("identify-spinner").style.display = "none";
        document.getElementById("identified-threats").classList.remove("hidden");
        document.getElementById("identified-threats").innerText = "There was an error. Please try again.";
        document.getElementById("step-3").scrollIntoView({
            behavior: "smooth"
        });
    });
});

// Retrieve CAPEC Entries Button Handler
const retrieveButton = document.getElementById("retrieve-button");
retrieveButton.addEventListener("click", function() {
    retrieveButton.innerText = "Retrieving CAPEC entries...";
    document.getElementById("retrieve-explanation").style.background = "lightcyan";
    document.getElementById("retrieve-explanation").style.borderLeftColor = "lightblue";
    document.getElementById("retrieve-spinner").style.display = "block";
    document.getElementById("step-4").scrollIntoView({
        behavior: "smooth"
    });
    const identifiedThreats = document.getElementById("identified-threats").innerText;
    fetch("/retrieve_entries", {
        method: "POST",
        headers: {
            "Content-Type": "text/plain",
        },
        body: identifiedThreats,
    })
    .then(response => response.json())
    .then(data => {
        retrieveButton.innerText = "Retry CAPEC retrieval";
        document.getElementById("retrieve-spinner").style.display = "none";
        document.getElementById("retrieve-options").classList.remove("hidden");
        document.getElementById("retrieve-search").addEventListener("keyup", function() {
            let searchString = this.value;
            const selectedLikelihood = document.getElementById("retrieve-filter-1").value;
            const selectedSeverity = document.getElementById("retrieve-filter-2").value;
            const tree = $("#retrieved-entries").jstree(true);
            tree.search(searchString);
            filterThreats(selectedLikelihood, selectedSeverity);
        });
        document.getElementById("retrieve-filter-1").addEventListener("change", function() {
            const selectedLikelihood = this.value;
            const selectedSeverity = document.getElementById("retrieve-filter-2").value;
            filterThreats(selectedLikelihood, selectedSeverity);
        });
        document.getElementById("retrieve-filter-2").addEventListener("change", function() {
            const selectedLikelihood = document.getElementById("retrieve-filter-1").value;
            const selectedSeverity = this.value;
            filterThreats(selectedLikelihood, selectedSeverity);
        });
        document.getElementById("expand-tree").addEventListener("click", function() {
            expandAllTriggered = true;
            $("#retrieved-entries").jstree("open_all");
        });
        document.getElementById("collapse-tree").addEventListener("click", function() {
            expandAllTriggered = false;
            $("#retrieved-entries").jstree("close_all");
        });
        document.getElementById("reset-tree").addEventListener("click", function() {
            expandAllTriggered = false;
            document.getElementById("retrieve-search").value = "";
            document.getElementById("retrieve-filter-1").value = "All";
            document.getElementById("retrieve-filter-2").value = "All";
            setupTreeView(data);
        });
        document.getElementById("retrieve-label").classList.remove("hidden");
        document.getElementById("retrieved-entries").classList.remove("hidden");
        setupTreeView(data);
        document.getElementById("print-button").classList.remove("hidden");
        document.getElementById("step-4").scrollIntoView({
            behavior: "smooth"
        });
    })
    .catch(error => {
        console.error("Error during CAPEC retrieval: ", error);
        retrieveButton.innerText = "Retry CAPEC retrieval";
        document.getElementById("retrieve-spinner").style.display = "none";
        document.getElementById("retrieved-entries").classList.remove("hidden");
        document.getElementById("retrieved-entries").innerText = "There was an error. Please try again.";
        document.getElementById("step-4").scrollIntoView({
            behavior: "smooth"
        });
    });
});