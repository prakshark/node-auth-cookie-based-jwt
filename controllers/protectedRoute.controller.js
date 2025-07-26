export async function r1Controller(req, res) {
    res.status(200).json({
        message: "Protected Route Reached"
    })
}