export interface IIssue {
    labels: string[],
    title: string,
    milestone: string,
    state: "open" | "closed"
}