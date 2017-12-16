const express = require('express');
const router = express.Router();
const pg = require('pg');
const path = require('path');

var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/pipeline'

/* GET home page. */
router.get('/', function(req, res, next) {
	res.sendFile('index.html');
});

module.exports = router;

router.get('/api/hashtagsView', (req, res, next) => {
	const results = [];
	pg.connect(connectionString, (err, client, done) => {
		if(err) {
			done();
			console.log(err);
			return res.status(500).json({success: false, data:err});
		}
		const query = client.query('SELECT * FROM hashtags_view ORDER BY total DESC LIMIT 20');
		query.on('row', (row) => {
			results.push(row);
		});
		query.on('end', () => {
			done();
			return res.json(results);
		});
	});
});


router.get('/api/timingHashtags', (req, res, next) => {
	const results = [];
	pg.connect(connectionString, (err, client, done) => {
		if(err) {
			done();
			console.log(err);
			return res.status(500).json({success: false, data:err});
		}
		const query = client.query('SELECT * FROM timing_hashtags ORDER BY minuteOfArrival ASC');
		query.on('row', (row) => {
			results.push(row);
		});
		query.on('end', () => {
			done();
			return res.json(results);
		});
	});
});

router.get('/api/likesView', (req, res, next) => {
	const results = [];
	pg.connect(connectionString, (err, client, done) => {
		if(err) {
			done();
			console.log(err);
			return res.status(500).json({success: false, data:err});
		}
		const query = client.query('SELECT * FROM likes_ctview ORDER BY name');
		query.on('row', (row) => {
			results.push(row);
		});
		query.on('end', () => {
			done();
			return res.json(results);
		});
	});
});

router.get('/api/sqlMtView', (req, res, next) => {
	const results = [];
	pg.connect(connectionString, (err, client, done) => {
		if(err) {
			done();
			console.log(err);
			return res.status(500).json({success: false, data:err});
		}
		const query = client.query('REFRESH MATERIALIZED VIEW likes_mtview', 
			function(err, result) {
				if (err) {
					return done(err);
				}
				const query = client.query('SELECT * FROM likes_mtview ORDER BY name');
				query.on('row', (row) => {
					results.push(row);
				});
				query.on('end', () => {
					done();
					return res.json(results);
				});
			});
		
	});
});

router.get('/api/sqlView', (req, res, next) => {
	const results = [];
	pg.connect(connectionString, (err, client, done) => {
		if(err) {
			done();
			console.log(err);
			return res.status(500).json({success: false, data:err});
		}
		const query = client.query('SELECT * FROM likes_view ORDER BY name');
		query.on('row', (row) => {
			results.push(row);
		});
		query.on('end', () => {
			done();
			return res.json(results);
		});
	});
});
			
			
