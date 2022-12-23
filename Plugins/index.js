if (document.readyState !== 'loading') {projects();
} else {document.addEventListener('DOMContentLoaded', function () {projects();});}
function projects() {
    const plugin = $('[data-spigotid]');
    $.each(plugin, function () {
        const self = $(this);
        $.getJSON("https://api.spigotmc.org/legacy/update.php?resource=" + self.data('spigotid'), function (data) {
            let desc = "v" + data;
            $.getJSON("https://api.spiget.org/v2/resources/" + self.data('spigotid'), function (data) {
                self.find(".lang").text(desc + "⠀⠀" + data["downloads"] + "⇩");
            })
        })
        
        $.getJSON("https://api.spiget.org/v2/resources/" + self.data('spigotid'), function (data) {
            const testedVersions = data["testedVersions"];
            if(testedVersions.length === 1) {self.find(".desc").text("(" + testedVersions + ")");
            } else {self.find(".desc").text("(" + testedVersions[0] + "-" + testedVersions[testedVersions.length - 1] + ")");}
        })
    })
}