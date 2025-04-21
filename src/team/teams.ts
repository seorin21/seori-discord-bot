// const Teams를 수정해서 원하는 팀을 등록하실 수 있습니다!
const Teams = {
    Youtube: ['DEV', 'MKT', 'DES'],
    Server: ['DEV', 'CS', 'DES'],
    Contents: ['DEV', 'CS', 'DES']
} as const;


type TeamName = keyof typeof Teams;
type Group<T extends TeamName> = typeof Teams[T][number];

type TeamGroup<T extends TeamName, R extends Group<T>> =
    `${Lowercase<T>}.${Lowercase<R>}`;

const Team = Object.fromEntries(
    (Object.keys(Teams) as TeamName[]).map(team => [
        team,
        Object.fromEntries(
            Teams[team].map(role => [
                role,
                `${team.toLowerCase()}.${role.toLowerCase()}` as const
            ])
        )
    ])
) as {
    [K in TeamName]: {
        [R in Group<K>]: TeamGroup<K, R>
    }
};

export type Teams = typeof Team[TeamName][keyof typeof Team[TeamName]];
export default Teams;