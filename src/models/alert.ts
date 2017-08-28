import { Issue } from './issue';

export class Alert {
    status: string;
    feedback: string;
    toolkitID: string;
    text: string;
    company: string;
    folder_type: string;
    trigger_time: string;
    image_name: string;
    missionID: string;
    locationID: string;
    json_name: string;
    id: string;
    issues: Issue[];
}