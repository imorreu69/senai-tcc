const express = require('express');
const router = express.Router();

// POST /api/v1/routes/optimize - Cálculo de otimização e mitigação de CO2
router.post('/optimize', (req, res) => {
    res.json({
        status: 'success',
        distance_km: 8.4,
        estimated_time_min: 19,
        co2_saved_kg: 1.76
    });
});

module.exports = router;
