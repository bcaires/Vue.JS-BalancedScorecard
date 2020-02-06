module.exports = {
    perspectiveWithChildren: `
    WITH RECURSIVE subperspective (id) AS (
        SELECT id FROM perspectives WHERE id = ?
        UNION ALL
        SELECT c.id from subperspective, perspectives c WHERE "parentId" = subperspective.id
    )

    SELECT id FROM subperspective
    `
}