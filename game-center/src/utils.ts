import Severity from "./model/Severity"
import Status from "./model/Status"

export function getStatusSeverity(status: Status): Severity {
    switch(status) {
        case 'Playing': return Severity.SUCCESS
        case 'Finished': return Severity.SUCCESS
        case 'Waiting': return Severity.WARNING
        case 'Reconnecting': return Severity.DANGER

        default: return Severity.INFO
    }
}
