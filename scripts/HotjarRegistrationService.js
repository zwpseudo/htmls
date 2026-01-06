class HotjarRegistrationService {
    static registerHotjarEventInURI(event) {
        window.location.href = window.location.href+'&hj_event='+encodeURI(event);
    }

    static consumeHotjarEventInURIIfExists() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        if(urlParams.get('hj_event')) {
            const event = decodeURI(urlParams.get('hj_event'));
            hj('event', event);
            urlParams.delete('hj_event')
            window.history.pushState({}, "", "?" + urlParams.toString());
        }
    }
}