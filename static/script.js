let expandAllTriggered = false;
let recognition;
let isListening = false;

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

document.getElementById("overview-explanation").style.background = "lightcyan";
document.getElementById("overview-explanation").style.borderLeftColor = "lightblue";

const micButton = document.getElementById("mic-button");
micButton.addEventListener("click", function() {
    if (!("webkitSpeechRecognition" in window)) {
        alert("Your browser does not support speech recognition.");
        return;
    }
    if (!recognition) {
        recognition = new webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = "en-US";
        recognition.onresult = (event) => {
            let finalTranscript = "";
            for (let i = event.resultIndex; i < event.results.length; i++) {
                if (event.results[i].isFinal) {
                    finalTranscript += event.results[i][0].transcript + ".";
                }
            }
            document.getElementById("system-description").value += finalTranscript;
        };
        recognition.onerror = (event) => {
            micButton.classList.remove("listening");
            recognition.stop();
            isListening = false;
            console.error("Speech recognition error detected: ", event.error);
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

document.getElementById("decompose-button").addEventListener("click", function() {
    document.getElementById("decompose-button").innerText = "Decomposing system...";
    document.getElementById("decompose-explanation").style.background = "lightcyan";
    document.getElementById("decompose-explanation").style.borderLeftColor = "lightblue";
    document.getElementById("decompose-spinner").style.display = "block";
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
        document.getElementById("decompose-button").innerText = "Retry system decomposition";
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
        document.getElementById("decompose-spinner").style.display = "none";
        document.getElementById("decomposed-system").innerText = "There was an error. Please try again.";
    });
});

document.getElementById("identify-button").addEventListener("click", function() {
    document.getElementById("identify-button").innerText = "Identifying threats...";
    document.getElementById("identify-explanation").style.background = "lightcyan";
    document.getElementById("identify-explanation").style.borderLeftColor = "lightblue";
    document.getElementById("identify-spinner").style.display = "block";
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
        document.getElementById("identify-button").innerText = "Retry threat identification";
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
        document.getElementById("identify-spinner").style.display = "none";
        document.getElementById("identified-threats").innerText = "There was an error. Please try again.";
    });
});

document.getElementById("retrieve-button").addEventListener("click", function() {
    document.getElementById("retrieve-button").innerText = "Retrieving CAPEC entries...";
    document.getElementById("retrieve-explanation").style.background = "lightcyan";
    document.getElementById("retrieve-explanation").style.borderLeftColor = "lightblue";
    document.getElementById("retrieve-spinner").style.display = "block";
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
        document.getElementById("retrieve-button").innerText = "Retry CAPEC retrieval";
        document.getElementById("retrieve-spinner").style.display = "none";
        document.getElementById("retrieve-options").classList.remove("hidden");
        document.getElementById("retrieve-search").classList.remove("hidden");
        document.getElementById("filter-label-1").classList.remove("hidden");
        document.getElementById("retrieve-filter-1").classList.remove("hidden");
        document.getElementById("retrieve-filter-1").addEventListener("change", function() {
            const selectedLikelihood = this.value;
            const selectedSeverity = document.getElementById("retrieve-filter-2").value;
            filterThreats(selectedLikelihood, selectedSeverity);
        });
        document.getElementById("filter-label-2").classList.remove("hidden");
        document.getElementById("retrieve-filter-2").classList.remove("hidden");
        document.getElementById("retrieve-filter-2").addEventListener("change", function() {
            const selectedLikelihood = document.getElementById("retrieve-filter-1").value;
            const selectedSeverity = this.value;
            filterThreats(selectedLikelihood, selectedSeverity);
        });
        document.getElementById("expand-tree").classList.remove("hidden");
        document.getElementById("separator").classList.remove("hidden");
        document.getElementById("collapse-tree").classList.remove("hidden");
        document.getElementById("retrieve-label").classList.remove("hidden");
        document.getElementById("retrieved-entries").classList.remove("hidden");
        if ($("#retrieved-entries").jstree(true)) {
            $("#retrieved-entries").jstree("destroy").empty();
        }
        $("#retrieved-entries").jstree({
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
        });
        document.getElementById("retrieve-search").addEventListener("keyup", function() {
            var searchString = this.value;
            const selectedLikelihood = document.getElementById("retrieve-filter-1").value;
            const selectedSeverity = document.getElementById("retrieve-filter-2").value;
            const tree = $("#retrieved-entries").jstree(true);
            tree.search(searchString);
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
        document.getElementById("print-button").classList.remove("hidden");
        document.getElementById("step-4").scrollIntoView({
            behavior: "smooth"
        });
    })
    .catch(error => {
        console.error("Error during CAPEC retrieval: ", error);
        document.getElementById("retrieve-spinner").style.display = "none";
        document.getElementById("retrieved-entries").innerText = "There was an error. Please try again.";
    });
});