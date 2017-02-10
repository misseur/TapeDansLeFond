require("source-map-support").install();
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var chunk = require("./" + "" + chunkId + "." + hotCurrentHash + ".hot-update.js");
/******/ 		hotAddUpdateChunk(chunk.id, chunk.modules);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest() { // eslint-disable-line no-unused-vars
/******/ 		try {
/******/ 			var update = require("./" + "" + hotCurrentHash + ".hot-update.json");
/******/ 		} catch(e) {
/******/ 			return Promise.resolve();
/******/ 		}
/******/ 		return Promise.resolve(update);
/******/ 	}
/******/ 	
/******/ 	function hotDisposeChunk(chunkId) { //eslint-disable-line no-unused-vars
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/
/******/ 	
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "965eae27a5ad01845114"; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotMainModule = true; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 				} else hotCurrentParents = [moduleId];
/******/ 				if(me.children.indexOf(request) < 0)
/******/ 					me.children.push(request);
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			hotMainModule = false;
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name)) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		Object.defineProperty(fn, "e", {
/******/ 			enumerable: true,
/******/ 			value: function(chunkId) {
/******/ 				if(hotStatus === "ready")
/******/ 					hotSetStatus("prepare");
/******/ 				hotChunksLoading++;
/******/ 				return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 					finishChunkLoading();
/******/ 					throw err;
/******/ 				});
/******/ 	
/******/ 				function finishChunkLoading() {
/******/ 					hotChunksLoading--;
/******/ 					if(hotStatus === "prepare") {
/******/ 						if(!hotWaitingFilesMap[chunkId]) {
/******/ 							hotEnsureUpdateChunk(chunkId);
/******/ 						}
/******/ 						if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 							hotUpdateDownloaded();
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		});
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotMainModule,
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotMainModule = true;
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest().then(function(update) {
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 	
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if(!deferred) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			hotApply(hotApplyOnUpdate).then(function(result) {
/******/ 				deferred.resolve(result);
/******/ 			}, function(err) {
/******/ 				deferred.reject(err);
/******/ 			});
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 	
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/ 	
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while(queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if(module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(!parent) continue;
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 	
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn("[HMR] unexpected require(" + result.moduleId + ") to disposed module");
/******/ 		};
/******/ 	
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				var result;
/******/ 				if(hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if(result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch(result.type) {
/******/ 					case "self-declined":
/******/ 						if(options.onDeclined)
/******/ 							options.onDeclined(result);
/******/ 						if(!options.ignoreDeclined)
/******/ 							abortError = new Error("Aborted because of self decline: " + result.moduleId + chainInfo);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if(options.onDeclined)
/******/ 							options.onDeclined(result);
/******/ 						if(!options.ignoreDeclined)
/******/ 							abortError = new Error("Aborted because of declined dependency: " + result.moduleId + " in " + result.parentId + chainInfo);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if(options.onUnaccepted)
/******/ 							options.onUnaccepted(result);
/******/ 						if(!options.ignoreUnaccepted)
/******/ 							abortError = new Error("Aborted because " + moduleId + " is not accepted" + chainInfo);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if(options.onAccepted)
/******/ 							options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if(options.onDisposed)
/******/ 							options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if(abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if(doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for(moduleId in result.outdatedDependencies) {
/******/ 						if(Object.prototype.hasOwnProperty.call(result.outdatedDependencies, moduleId)) {
/******/ 							if(!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(outdatedDependencies[moduleId], result.outdatedDependencies[moduleId]);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if(doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if(hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/ 	
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for(moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				module = installedModules[moduleId];
/******/ 				if(module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for(j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if(idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				module = installedModules[moduleId];
/******/ 				moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				var callbacks = [];
/******/ 				for(i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 					dependency = moduleOutdatedDependencies[i];
/******/ 					cb = module.hot._acceptedDependencies[dependency];
/******/ 					if(callbacks.indexOf(cb) >= 0) continue;
/******/ 					callbacks.push(cb);
/******/ 				}
/******/ 				for(i = 0; i < callbacks.length; i++) {
/******/ 					cb = callbacks[i];
/******/ 					try {
/******/ 						cb(moduleOutdatedDependencies);
/******/ 					} catch(err) {
/******/ 						if(options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "accept-errored",
/******/ 								moduleId: moduleId,
/******/ 								dependencyId: moduleOutdatedDependencies[i],
/******/ 								error: err
/******/ 							});
/******/ 						}
/******/ 						if(!options.ignoreErrored) {
/******/ 							if(!error)
/******/ 								error = err;
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err2) {
/******/ 						if(options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								orginalError: err
/******/ 							});
/******/ 						}
/******/ 						if(!options.ignoreErrored) {
/******/ 							if(!error)
/******/ 								error = err2;
/******/ 						}
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if(options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if(!options.ignoreErrored) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		return Promise.resolve(outdatedModules);
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets/";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(50)(__webpack_require__.s = 50);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/index.js?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:3]!./node_modules/postcss-loader/index.js!./node_modules/postcss-loader/index.js!./node_modules/vitaminjs/src/server/components/ErrorPage/style.css":
/* unknown exports provided */
/* all exports used */
/*!*******************************************************************************************************************************************************************************************************!*\
  !*** ./~/css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:3]!./~/postcss-loader!./~/postcss-loader!./~/vitaminjs/src/server/components/ErrorPage/style.css ***!
  \*******************************************************************************************************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ./../../../../../css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")();
// imports


// module
exports.push([module.i, "\nhtml {\n    height: 100%;\n    box-sizing: border-box;\n}\n\n*,\n*:before,\n*:after {\n  box-sizing: inherit;\n}\n\nbody {\n    background-color: rgb(245, 245, 245);\n    font-family: 'Roboto', sans-serif;\n    position: relative;\n    min-height: 100%;\n    margin: 0;\n    padding-bottom: 6rem;\n}\n\n.style__page___ZsD {\n    padding-top: 80px;\n    color: rgb(150,150,150);\n}\n\n.style__container___YJT {\n    margin: auto;\n    max-width: 500px;\n    text-align: center;\n}\n\n.style__pineapple___2-P {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -ms-flex-pack: distribute;\n        justify-content: space-around;\n}\n\n.style__pineapple___2-P > * {\n    -webkit-box-flex: 1;\n        -ms-flex: 1;\n            flex: 1;\n}\n\n@media (max-width: 400px) {\n    .style__pineapple___2-P {\n        font-size: 150px;\n    }\n    .style__pineapple___2-P svg {\n        width: 100px;\n    }\n}\n\n@media (min-width: 401px) {\n    .style__pineapple___2-P {\n        font-size: 220px;\n    }\n    .style__pineapple___2-P svg {\n        width: 150px;\n    }\n}\n\n.style__stack-container___2Cb {\n    background-color: rgb(249, 249, 249);\n    padding: 10px;\n    border-radius: 20px;\n    margin: auto;\n    margin-top: 30px;\n    max-width: 1100px;\n    width: calc(100% - 40px);\n}\n\n.style__error-details___TXm {\n    margin-left: 15px;\n    color: sienna;\n}\n\ncode {\n    font-family: 'Roboto Mono', monospace;\n    font-size: 14px;\n}\npre {\n    white-space: pre-wrap;\n}\n\na {\n    color: cornflowerblue;\n}\n\nfooter {\n    position: absolute;\n    bottom: 0;\n    right: 0;\n    left: 0;\n    text-align: right;\n    padding: 1rem;\n}\n", "", {"version":3,"sources":["/../../src/server/components/ErrorPage/style.css"],"names":[],"mappings":";AACA;IACI,aAAa;IACb,uBAAuB;CAC1B;;AAED;;;EAGE,oBAAoB;CACrB;;AAED;IACI,qCAAqC;IACrC,kCAAkC;IAClC,mBAAmB;IACnB,iBAAiB;IACjB,UAAU;IACV,qBAAqB;CACxB;;AAED;IACI,kBAAkB;IAClB,wBAAwB;CAC3B;;AAED;IACI,aAAa;IACb,iBAAiB;IACjB,mBAAmB;CACtB;;AAED;IACI,qBAAc;IAAd,qBAAc;IAAd,cAAc;IACd,0BAAoB;QAApB,uBAAoB;YAApB,oBAAoB;IACpB,0BAA8B;QAA9B,8BAA8B;CACjC;;AAED;IACI,oBAAQ;QAAR,YAAQ;YAAR,QAAQ;CACX;;AAED;IACI;QACI,iBAAiB;KACpB;IACD;QACI,aAAa;KAChB;CACJ;;AAED;IACI;QACI,iBAAiB;KACpB;IACD;QACI,aAAa;KAChB;CACJ;;AAED;IACI,qCAAqC;IACrC,cAAc;IACd,oBAAoB;IACpB,aAAa;IACb,iBAAiB;IACjB,kBAAkB;IAClB,yBAAyB;CAC5B;;AAED;IACI,kBAAkB;IAClB,cAAc;CACjB;;AAED;IACI,sCAAsC;IACtC,gBAAgB;CACnB;AACD;IACI,sBAAsB;CACzB;;AAED;IACI,sBAAsB;CACzB;;AAED;IACI,mBAAmB;IACnB,UAAU;IACV,SAAS;IACT,QAAQ;IACR,kBAAkB;IAClB,cAAc;CACjB","file":"style.css","sourcesContent":["\nhtml {\n    height: 100%;\n    box-sizing: border-box;\n}\n\n*,\n*:before,\n*:after {\n  box-sizing: inherit;\n}\n\nbody {\n    background-color: rgb(245, 245, 245);\n    font-family: 'Roboto', sans-serif;\n    position: relative;\n    min-height: 100%;\n    margin: 0;\n    padding-bottom: 6rem;\n}\n\n.page {\n    padding-top: 80px;\n    color: rgb(150,150,150);\n}\n\n.container {\n    margin: auto;\n    max-width: 500px;\n    text-align: center;\n}\n\n.pineapple {\n    display: flex;\n    align-items: center;\n    justify-content: space-around;\n}\n\n.pineapple > * {\n    flex: 1;\n}\n\n@media (max-width: 400px) {\n    .pineapple {\n        font-size: 150px;\n    }\n    .pineapple svg {\n        width: 100px;\n    }\n}\n\n@media (min-width: 401px) {\n    .pineapple {\n        font-size: 220px;\n    }\n    .pineapple svg {\n        width: 150px;\n    }\n}\n\n.stack-container {\n    background-color: rgb(249, 249, 249);\n    padding: 10px;\n    border-radius: 20px;\n    margin: auto;\n    margin-top: 30px;\n    max-width: 1100px;\n    width: calc(100% - 40px);\n}\n\n.error-details {\n    margin-left: 15px;\n    color: sienna;\n}\n\ncode {\n    font-family: 'Roboto Mono', monospace;\n    font-size: 14px;\n}\npre {\n    white-space: pre-wrap;\n}\n\na {\n    color: cornflowerblue;\n}\n\nfooter {\n    position: absolute;\n    bottom: 0;\n    right: 0;\n    left: 0;\n    text-align: right;\n    padding: 1rem;\n}\n"],"sourceRoot":"webpack://"}]);

// exports
exports.locals = {
	"page": "style__page___ZsD",
	"container": "style__container___YJT",
	"pineapple": "style__pineapple___2-P",
	"stack-container": "style__stack-container___2Cb",
	"error-details": "style__error-details___TXm"
};

/***/ }),

/***/ "./node_modules/css-loader/index.js?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:3]!./node_modules/postcss-loader/index.js!./node_modules/postcss-loader/index.js!./src/style.css":
/* unknown exports provided */
/* all exports used */
/*!***************************************************************************************************************************************************************!*\
  !*** ./~/css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:3]!./~/postcss-loader!./~/postcss-loader!./src/style.css ***!
  \***************************************************************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ./../~/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")();
// imports
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Raleway);", ""]);

// module
exports.push([module.i, "body {\n\theight: 100%;\n\twidth: 100%;\n\tmargin: 0;\n}\n\n.style__app___8VL {\n\tdisplay: -webkit-box;\n\tdisplay: -ms-flexbox;\n\tdisplay: flex;\n\t-webkit-box-pack: center;\n\t    -ms-flex-pack: center;\n\t        justify-content: center;\n\t-webkit-box-align: center;\n\t    -ms-flex-align: center;\n\t        align-items: center;\n\t-webkit-box-orient: vertical;\n\t-webkit-box-direction: normal;\n\t    -ms-flex-direction: column;\n\t        flex-direction: column;\n\tfont-family: 'Raleway';\n}\n\n.style__header___3Hv {\n\tbackground-color: white;\n\twidth: 100%;\n\tdisplay: -webkit-box;\n\tdisplay: -ms-flexbox;\n\tdisplay: flex;\n\t-webkit-box-pack: center;\n\t    -ms-flex-pack: center;\n\t        justify-content: center;\n}\n\n.style__name___22s {\n\twidth: 50%;\n}\n\n.style__logo___Fbx {\n\twidth: 215px;\n\theight: 185px;\n}\n\n.style__message___2U8 {\n\tmax-width: 550px;\n\ttext-align: center;\n\tline-height: 32px;\n\tmargin-bottom: 50px;\n}\n\n.style__counter___3_1 {\n    width: 30vw;\n    height: 100px;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    border: 1px solid rgb(217, 165, 97);\n}\n\n.style__value___3GQ {\n    color: red;\n    font-weight: bold;\n}\n\n.style__button___1q1 {\n    margin: 5px;\n}", "", {"version":3,"sources":["/../../../../src/style.css"],"names":[],"mappings":"AAEA;CACC,aAAa;CACb,YAAY;CACZ,UAAU;CACV;;AAED;CACC,qBAAc;CAAd,qBAAc;CAAd,cAAc;CACd,yBAAwB;KAAxB,sBAAwB;SAAxB,wBAAwB;CACxB,0BAAoB;KAApB,uBAAoB;SAApB,oBAAoB;CACpB,6BAAuB;CAAvB,8BAAuB;KAAvB,2BAAuB;SAAvB,uBAAuB;CACvB,uBAAuB;CACvB;;AAED;CACC,wBAAwB;CACxB,YAAY;CACZ,qBAAc;CAAd,qBAAc;CAAd,cAAc;CACd,yBAAwB;KAAxB,sBAAwB;SAAxB,wBAAwB;CACxB;;AAED;CACC,WAAW;CACX;;AAED;CACC,aAAa;CACb,cAAc;CACd;;AAED;CACC,iBAAiB;CACjB,mBAAmB;CACnB,kBAAkB;CAClB,oBAAoB;CACpB;;AAED;IACI,YAAY;IACZ,cAAc;IACd,qBAAc;IAAd,qBAAc;IAAd,cAAc;IACd,yBAAwB;QAAxB,sBAAwB;YAAxB,wBAAwB;IACxB,0BAAoB;QAApB,uBAAoB;YAApB,oBAAoB;IACpB,oCAAoC;CACvC;;AAED;IACI,WAAW;IACX,kBAAkB;CACrB;;AAED;IACI,YAAY;CACf","file":"style.css","sourcesContent":["@import 'https://fonts.googleapis.com/css?family=Raleway';\n\nbody {\n\theight: 100%;\n\twidth: 100%;\n\tmargin: 0;\n}\n\n.app {\n\tdisplay: flex;\n\tjustify-content: center;\n\talign-items: center;\n\tflex-direction: column;\n\tfont-family: 'Raleway';\n}\n\n.header {\n\tbackground-color: white;\n\twidth: 100%;\n\tdisplay: flex;\n\tjustify-content: center;\n}\n\n.name {\n\twidth: 50%;\n}\n\n.logo {\n\twidth: 215px;\n\theight: 185px;\n}\n\n.message {\n\tmax-width: 550px;\n\ttext-align: center;\n\tline-height: 32px;\n\tmargin-bottom: 50px;\n}\n\n.counter {\n    width: 30vw;\n    height: 100px;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    border: 1px solid rgb(217, 165, 97);\n}\n\n.value {\n    color: red;\n    font-weight: bold;\n}\n\n.button {\n    margin: 5px;\n}"],"sourceRoot":"webpack://"}]);

// exports
exports.locals = {
	"app": "style__app___8VL",
	"header": "style__header___3Hv",
	"name": "style__name___22s",
	"logo": "style__logo___Fbx",
	"message": "style__message___2U8",
	"counter": "style__counter___3_1",
	"value": "style__value___3GQ",
	"button": "style__button___1q1"
};

/***/ }),

/***/ "./node_modules/css-loader/lib/css-base.js":
/* unknown exports provided */
/* all exports used */
/*!**************************************!*\
  !*** ./~/css-loader/lib/css-base.js ***!
  \**************************************/
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ }),

/***/ "./node_modules/isomorphic-style-loader/lib/insertCss.js":
/* unknown exports provided */
/* all exports used */
/*!****************************************************!*\
  !*** ./~/isomorphic-style-loader/lib/insertCss.js ***!
  \****************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _stringify = __webpack_require__(/*! babel-runtime/core-js/json/stringify */ 4);

var _stringify2 = _interopRequireDefault(_stringify);

var _slicedToArray2 = __webpack_require__(/*! babel-runtime/helpers/slicedToArray */ 33);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _getIterator2 = __webpack_require__(/*! babel-runtime/core-js/get-iterator */ 31);

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Isomorphic CSS style loader for Webpack
 *
 * Copyright © 2015-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

var prefix = 's';
var inserted = {};

// Base64 encoding and decoding - The "Unicode Problem"
// https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#The_Unicode_Problem
function b64EncodeUnicode(str) {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
    return String.fromCharCode('0x' + p1);
  }));
}

/**
 * Remove style/link elements for specified node IDs
 * if they are no longer referenced by UI components.
 */
function removeCss(ids) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = (0, _getIterator3.default)(ids), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var id = _step.value;

      if (--inserted[id] <= 0) {
        var elem = document.getElementById(prefix + id);
        if (elem) {
          elem.parentNode.removeChild(elem);
        }
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}

/**
 * Example:
 *   // Insert CSS styles object generated by `css-loader` into DOM
 *   var removeCss = insertCss([[1, 'body { color: red; }']]);
 *
 *   // Remove it from the DOM
 *   removeCss();
 */
function insertCss(styles) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$replace = _ref.replace,
      replace = _ref$replace === undefined ? false : _ref$replace,
      _ref$prepend = _ref.prepend,
      prepend = _ref$prepend === undefined ? false : _ref$prepend;

  var ids = [];
  for (var i = 0; i < styles.length; i++) {
    var _styles$i = (0, _slicedToArray3.default)(styles[i], 4),
        moduleId = _styles$i[0],
        css = _styles$i[1],
        media = _styles$i[2],
        sourceMap = _styles$i[3];

    var id = moduleId + '-' + i;

    ids.push(id);

    if (inserted[id]) {
      if (!replace) {
        inserted[id]++;
        continue;
      }
    }

    inserted[id] = 1;

    var elem = document.getElementById(prefix + id);
    var create = false;

    if (!elem) {
      create = true;

      elem = document.createElement('style');
      elem.setAttribute('type', 'text/css');
      elem.id = prefix + id;

      if (media) {
        elem.setAttribute('media', media);
      }
    }

    var cssText = css;
    if (sourceMap && btoa) {
      // skip IE9 and below, see http://caniuse.com/atob-btoa
      cssText += '\n/*# sourceMappingURL=data:application/json;base64,' + b64EncodeUnicode((0, _stringify2.default)(sourceMap)) + '*/';
      cssText += '\n/*# sourceURL=' + sourceMap.file + '?' + id + '*/';
    }

    if ('textContent' in elem) {
      elem.textContent = cssText;
    } else {
      elem.styleSheet.cssText = cssText;
    }

    if (create) {
      if (prepend) {
        document.head.insertBefore(elem, document.head.childNodes[0]);
      } else {
        document.head.appendChild(elem);
      }
    }
  }

  return removeCss.bind(null, ids);
}

module.exports = insertCss;

/***/ }),

/***/ "./node_modules/vitaminjs/config/build/babelrc.js":
/* exports provided: default */
/* exports used: default */
/*!*********************************************!*\
  !*** ./~/vitaminjs/config/build/babelrc.js ***!
  \*********************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_preset_es2015__ = __webpack_require__(/*! babel-preset-es2015 */ 26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_preset_es2015___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_preset_es2015__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_preset_react__ = __webpack_require__(/*! babel-preset-react */ 29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_preset_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_preset_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_preset_es2016__ = __webpack_require__(/*! babel-preset-es2016 */ 27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_preset_es2016___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_preset_es2016__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_preset_es2017__ = __webpack_require__(/*! babel-preset-es2017 */ 28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_preset_es2017___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_preset_es2017__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_preset_stage_1__ = __webpack_require__(/*! babel-preset-stage-1 */ 30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_preset_stage_1___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_preset_stage_1__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_plugin_transform_es2015_function_name__ = __webpack_require__(/*! babel-plugin-transform-es2015-function-name */ 22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_plugin_transform_es2015_function_name___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_plugin_transform_es2015_function_name__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_plugin_react_require__ = __webpack_require__(/*! babel-plugin-react-require */ 21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_plugin_react_require___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_babel_plugin_react_require__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_babel_plugin_transform_runtime__ = __webpack_require__(/*! babel-plugin-transform-runtime */ 25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_babel_plugin_transform_runtime___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_babel_plugin_transform_runtime__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_babel_plugin_transform_export_default_name_forked__ = __webpack_require__(/*! babel-plugin-transform-export-default-name-forked */ 23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_babel_plugin_transform_export_default_name_forked___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_babel_plugin_transform_export_default_name_forked__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_babel_plugin_minify_replace__ = __webpack_require__(/*! babel-plugin-minify-replace */ 20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_babel_plugin_minify_replace___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_babel_plugin_minify_replace__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_babel_plugin_transform_node_env_inline__ = __webpack_require__(/*! babel-plugin-transform-node-env-inline */ 24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_babel_plugin_transform_node_env_inline___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_babel_plugin_transform_node_env_inline__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_babel_plugin_minify_dead_code_elimination__ = __webpack_require__(/*! babel-plugin-minify-dead-code-elimination */ 18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_babel_plugin_minify_dead_code_elimination___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_babel_plugin_minify_dead_code_elimination__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_babel_plugin_minify_guarded_expressions__ = __webpack_require__(/*! babel-plugin-minify-guarded-expressions */ 19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_babel_plugin_minify_guarded_expressions___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_babel_plugin_minify_guarded_expressions__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_babel_plugin_discard_module_references__ = __webpack_require__(/*! babel-plugin-discard-module-references */ 17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_babel_plugin_discard_module_references___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_babel_plugin_discard_module_references__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__utils__ = __webpack_require__(/*! ../utils */ "./node_modules/vitaminjs/config/utils/index.js");
















/* harmony default export */ __webpack_exports__["a"] = function babelrc(env) {
    return {
        presets: [env === 'client' && [__WEBPACK_IMPORTED_MODULE_0_babel_preset_es2015__["buildPreset"], { modules: false }], __WEBPACK_IMPORTED_MODULE_1_babel_preset_react___default.a, __WEBPACK_IMPORTED_MODULE_2_babel_preset_es2016___default.a, __WEBPACK_IMPORTED_MODULE_3_babel_preset_es2017___default.a, __WEBPACK_IMPORTED_MODULE_4_babel_preset_stage_1___default.a].filter(Boolean),
        plugins: [
        // The only missing plugin for node 6
        env === 'server' && __WEBPACK_IMPORTED_MODULE_5_babel_plugin_transform_es2015_function_name___default.a,
        // Make optional the explicit import of React in JSX files
        __WEBPACK_IMPORTED_MODULE_6_babel_plugin_react_require___default.a,
        // Add Object.entries, Object.values and other ES2017 functionalities
        // in the client, we prefer solution like https://polyfill.io/v2/docs/, to keep the
        // bundle size the smallest possible.
        env === 'server' && __WEBPACK_IMPORTED_MODULE_7_babel_plugin_transform_runtime___default.a,
        // replace process.env.NODE_ENV by its current value
        __WEBPACK_IMPORTED_MODULE_10_babel_plugin_transform_node_env_inline___default.a,
        // replace IS_CLIENT and IS_SERVER
        [__WEBPACK_IMPORTED_MODULE_9_babel_plugin_minify_replace___default.a, {
            replacements: [{
                identifierName: 'IS_CLIENT',
                replacement: { type: 'booleanLiteral', value: env === 'client' }
            }, {
                identifierName: 'IS_SERVER',
                replacement: { type: 'booleanLiteral', value: env === 'server' }
            }]
        }],
        // Dead code elimination (for example: if (IS_CLIENT) { ... } becames if (false) { }
        [__WEBPACK_IMPORTED_MODULE_11_babel_plugin_minify_dead_code_elimination___default.a, { keepFnName: true }],
        // transforms `IS_CLIENT && doSomething()` => `false && doSomething()` to `false`
        __WEBPACK_IMPORTED_MODULE_12_babel_plugin_minify_guarded_expressions___default.a,
        // Remove server-only or client-only imports
        __WEBPACK_IMPORTED_MODULE_13_babel_plugin_discard_module_references___default.a,
        // easier debugging on export default arrow functions with the filename
        __WEBPACK_IMPORTED_MODULE_8_babel_plugin_transform_export_default_name_forked___default.a].filter(Boolean),
        sourceRoot: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_14__utils__["a" /* vitaminResolve */])()
    };
};

/***/ }),

/***/ "./node_modules/vitaminjs/config/build/webpack.config.client.js":
/* exports provided: default */
/* exports used: default */
/*!***********************************************************!*\
  !*** ./~/vitaminjs/config/build/webpack.config.client.js ***!
  \***********************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify__ = __webpack_require__(/*! babel-runtime/core-js/json/stringify */ 4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_mergewith__ = __webpack_require__(/*! lodash.mergewith */ 43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_mergewith___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lodash_mergewith__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_webpack__ = __webpack_require__(/*! webpack */ 6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_webpack___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_webpack__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_serviceworker_webpack_plugin__ = __webpack_require__(/*! serviceworker-webpack-plugin */ 47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_serviceworker_webpack_plugin___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_serviceworker_webpack_plugin__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__webpack_config_common_js__ = __webpack_require__(/*! ./webpack.config.common.js */ "./node_modules/vitaminjs/config/build/webpack.config.common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils__ = __webpack_require__(/*! ../utils */ "./node_modules/vitaminjs/config/utils/index.js");
/* harmony export (immutable) */ __webpack_exports__["a"] = clientConfig;








function clientConfig(options) {
    const hotMiddlewareEntry = `webpack-hot-middleware/client?path=${options.publicPath}/__webpack_hmr`;
    return __WEBPACK_IMPORTED_MODULE_1_lodash_mergewith___default()({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__webpack_config_common_js__["a" /* config */])(options), {
        entry: [__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__utils__["a" /* vitaminResolve */])('src', 'client', 'index.jsx'), ...(options.hot ? [hotMiddlewareEntry] : [])],
        output: {
            path: options.client.buildPath,
            filename: options.client.filename
        },
        module: {
            rules: [__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__webpack_config_common_js__["b" /* createBabelLoader */])('client'), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__webpack_config_common_js__["c" /* createResolveConfigLoader */])()]
        },
        plugins: [...(options.hot ? [new __WEBPACK_IMPORTED_MODULE_2_webpack___default.a.NoEmitOnErrorsPlugin(), new __WEBPACK_IMPORTED_MODULE_2_webpack___default.a.optimize.OccurrenceOrderPlugin()] : []), ...(!options.dev ? [new __WEBPACK_IMPORTED_MODULE_2_webpack___default.a.optimize.UglifyJsPlugin({ minimize: true })] : []), new __WEBPACK_IMPORTED_MODULE_2_webpack___default.a.DefinePlugin({
            'process.env.NODE_ENV': __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default()(undefined)
        }), ...(options.client.serviceWorker ? [new __WEBPACK_IMPORTED_MODULE_3_serviceworker_webpack_plugin___default.a({
            entry: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__utils__["b" /* appResolve */])(options.client.serviceWorker)
        })] : [])]
    }, __WEBPACK_IMPORTED_MODULE_5__utils__["c" /* concat */]);
}

/***/ }),

/***/ "./node_modules/vitaminjs/config/build/webpack.config.common.js":
/* exports provided: createBabelLoader, createResolveConfigLoader, config */
/* exports used: config, createBabelLoader, createResolveConfigLoader */
/*!***********************************************************!*\
  !*** ./~/vitaminjs/config/build/webpack.config.common.js ***!
  \***********************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webpack__ = __webpack_require__(/*! webpack */ 6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webpack___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_webpack__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_autoprefixer__ = __webpack_require__(/*! autoprefixer */ 16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_autoprefixer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_autoprefixer__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_path__ = __webpack_require__(/*! path */ 8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_path___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_path__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils__ = __webpack_require__(/*! ../utils */ "./node_modules/vitaminjs/config/utils/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__babelrc__ = __webpack_require__(/*! ./babelrc */ "./node_modules/vitaminjs/config/build/babelrc.js");
/* harmony export (immutable) */ __webpack_exports__["a"] = config;






const VITAMIN_DIRECTORY = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils__["a" /* vitaminResolve */])();
const VITAMIN_MODULES_DIRECTORY = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils__["a" /* vitaminResolve */])('node_modules');
const VITAMIN_MODULES_EXAMPLES_DIRECTORY = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils__["a" /* vitaminResolve */])('examples');
const MODULES_DIRECTORIES = [__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils__["b" /* appResolve */])('node_modules'), VITAMIN_MODULES_DIRECTORY];

const createBabelLoader = env => ({
    test: /\.js(x?)$/,
    loader: 'babel-loader',
    include: path => !path.includes('node_modules') || path.startsWith(VITAMIN_DIRECTORY) && !path.startsWith(VITAMIN_MODULES_DIRECTORY) && !path.startsWith(VITAMIN_MODULES_EXAMPLES_DIRECTORY),
    query: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__babelrc__["a" /* default */])(env)
});
/* harmony export (immutable) */ __webpack_exports__["b"] = createBabelLoader;


const createResolveConfigLoader = () => ({
    // The following loader will resolve the config to its final value during the build
    test: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils__["a" /* vitaminResolve */])('config/index'),
    loader: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils__["a" /* vitaminResolve */])('config/build/resolveConfigLoader')
});
/* harmony export (immutable) */ __webpack_exports__["c"] = createResolveConfigLoader;


function config(options) {
    return {
        devtool: options.dev && 'source-map',
        output: {
            pathinfo: options.dev,
            publicPath: `${options.publicPath}/`
        },
        module: {
            // Disable handling of unknown requires
            unknownContextRegExp: /$^/,
            unknownContextCritical: true,
            // Disable handling of requires with a single expression
            exprContextRegExp: /$^/,
            exprContextCritical: true,
            // Disable handling of expression in require
            wrappedContextRegExp: /$^/,
            wrappedContextCritical: true,

            rules: [{
                // only files with .global will go through this loader
                test: /\.global\.css$/,
                loaders: ['isomorphic-style-loader', 'css-loader?sourceMap&importLoaders=1!postcss-loader', 'postcss-loader']
            }, {
                // anything with .global will not go through css modules loader
                test: /^((?!\.global).)*\.css$/,
                loaders: ['isomorphic-style-loader', 'css-loader?modules&sourceMap&importLoaders=1' + '&localIdentName=[name]__[local]___[hash:base64:3]!postcss-loader', 'postcss-loader']
            }, {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|eot|ttf)$/,
                loader: `url-loader?limit=10000&name=${__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_path__["join"])(options.filesPath, '[hash].[ext]')}`
            }, {
                test: /\.json$/,
                loader: 'json-loader'
            }]
        },

        resolveLoader: {
            modules: MODULES_DIRECTORIES
        },
        cache: options.hot,
        resolve: {
            alias: options.moduleMap,
            modules: MODULES_DIRECTORIES,
            extensions: ['.js', '.jsx', '.json', '.css']
        },
        plugins: [new __WEBPACK_IMPORTED_MODULE_0_webpack__["LoaderOptionsPlugin"]({
            options: {
                context: __dirname,
                postcss: [__WEBPACK_IMPORTED_MODULE_1_autoprefixer___default()()]
            },
            test: /\.css$/,
            debug: true

        }), ...(options.hot ? [new __WEBPACK_IMPORTED_MODULE_0_webpack__["HotModuleReplacementPlugin"](), new __WEBPACK_IMPORTED_MODULE_0_webpack__["NamedModulesPlugin"]()] : [])]
    };
}

/***/ }),

/***/ "./node_modules/vitaminjs/config/index.js":
/* unknown exports provided */
/* exports used: default */
/*!*************************************!*\
  !*** ./~/vitaminjs/config/index.js ***!
  \*************************************/
/***/ (function(module, exports) {

module.exports = { "server": { "buildPath": "/Users/n3x7/Documents/Etna/GPE/build", "filename": "server_bundle.js", "host": "localhost", "port": 3000 }, "basePath": "", "publicPath": "/assets", "servePublic": true, "client": { "buildPath": "/Users/n3x7/Documents/Etna/GPE/public", "filename": "client_bundle.[hash].js", "serviceWorker": false }, "filesPath": "files", "rootElementId": "vitamin-app", "moduleMap": { "__app_modules__routes__": "/Users/n3x7/Documents/Etna/GPE/src/routes", "__app_modules__server_middlewares__": "/Users/n3x7/Documents/Etna/GPE/node_modules/vitaminjs/config/utils/emptyArray", "__app_modules__server_ErrorPage__": "/Users/n3x7/Documents/Etna/GPE/node_modules/vitaminjs/src/server/components/ErrorPage", "__app_modules__server_onError__": "/Users/n3x7/Documents/Etna/GPE/node_modules/vitaminjs/config/utils/defaultFunction", "__app_modules__server_layout__": "/Users/n3x7/Documents/Etna/GPE/node_modules/vitaminjs/src/server/components/HtmlLayout", "__app_modules__server_actionDispatcher__": "/Users/n3x7/Documents/Etna/GPE/node_modules/vitaminjs/config/utils/defaultFunction", "__app_modules__redux_reducers__": "/Users/n3x7/Documents/Etna/GPE/src/reducers", "__app_modules__redux_middlewares__": "/Users/n3x7/Documents/Etna/GPE/node_modules/vitaminjs/config/utils/emptyArray", "__app_modules__redux_enhancers__": "/Users/n3x7/Documents/Etna/GPE/node_modules/vitaminjs/config/utils/emptyArray", "__app_modules__redux_stateSerializer__": "/Users/n3x7/Documents/Etna/GPE/node_modules/vitaminjs/src/shared/defaultStateSerializer" } };

/***/ }),

/***/ "./node_modules/vitaminjs/config/utils/defaultFunction.js":
/* exports provided: default */
/* exports used: default */
/*!*****************************************************!*\
  !*** ./~/vitaminjs/config/utils/defaultFunction.js ***!
  \*****************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = function defaultFunction() {};

/***/ }),

/***/ "./node_modules/vitaminjs/config/utils/emptyArray.js":
/* exports provided: default */
/* exports used: default */
/*!************************************************!*\
  !*** ./~/vitaminjs/config/utils/emptyArray.js ***!
  \************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = [];

/***/ }),

/***/ "./node_modules/vitaminjs/config/utils/hot.js":
/* unknown exports provided */
/* all exports used */
/*!*****************************************!*\
  !*** ./~/vitaminjs/config/utils/hot.js ***!
  \*****************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__resourceQuery) {Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_chalk__ = __webpack_require__(/*! chalk */ 5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_chalk___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_chalk__);
/* eslint-disable */


/*
 * copied from https://github.com/webpack/webpack/blob/master/hot/signal.js
 * and tweeked to display better color messages and send a restart signal
 */
/*
 MIT License http://www.opensource.org/licenses/mit-license.php
 Author Tobias Koppers @sokra
 */
/*globals __resourceQuery */
if (false) {
  throw new Error("[HMR] Hot Module Replacement is disabled.");
}
if (!process.send) {
  throw new Error("[HMR] You need to spawn the process.");
}
var checkForUpdate = function checkForUpdate(fromUpdate) {
  module.hot.check().then(function (updatedModules) {
    if (!updatedModules) {
      if (fromUpdate) console.log(`${__WEBPACK_IMPORTED_MODULE_0_chalk___default.a.green('\u2713')} Server hot reloaded.`);
      return;
    }

    return module.hot.apply({
      ignoreUnaccepted: true
    }).then(function (renewedModules) {
      const unacceptedModules = updatedModules.filter(moduleId => renewedModules && !renewedModules.includes(moduleId));
      if (unacceptedModules.length) {
        process.send('restart');
        return;
      }

      checkForUpdate(true);
    });
  }).catch(function () {
    process.send('restart');
  });
};

process.on(__resourceQuery.substr(1) || "SIGUSR2", function () {
  if (module.hot.status() !== "idle") {
    console.warn("[HMR] Got signal but currently in " + module.hot.status() + " state.");
    console.warn("[HMR] Need to be in idle state to start hot update.");
    return;
  }

  checkForUpdate();
});
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, ""))

/***/ }),

/***/ "./node_modules/vitaminjs/config/utils/index.js":
/* exports provided: vitaminResolve, appResolve, concat */
/* exports used: vitaminResolve, appResolve, concat */
/*!*******************************************!*\
  !*** ./~/vitaminjs/config/utils/index.js ***!
  \*******************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = vitaminResolve;
/* harmony export (immutable) */ __webpack_exports__["b"] = appResolve;
/* harmony export (immutable) */ __webpack_exports__["c"] = concat;

const path = __webpack_require__(/*! path */ 8);

function vitaminResolve(...args) {
    return path.resolve(process.env.VITAMIN_PATH, ...args);
}

function appResolve(...args) {
    return path.resolve(process.cwd(), ...args);
}

function concat(left, right) {
    if (!Array.isArray(left) || !Array.isArray(right) || right === left) {
        return undefined;
    }
    return left.concat(right);
}

/***/ }),

/***/ "./node_modules/vitaminjs/src/server/app.js":
/* exports provided: default */
/* all exports used */
/*!***************************************!*\
  !*** ./~/vitaminjs/src/server/app.js ***!
  \***************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_koa_compose__ = __webpack_require__(/*! koa-compose */ 38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_koa_compose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_koa_compose__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_koa_etag__ = __webpack_require__(/*! koa-etag */ 40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_koa_etag___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_koa_etag__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_koa_conditional_get__ = __webpack_require__(/*! koa-conditional-get */ 39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_koa_conditional_get___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_koa_conditional_get__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__middlewares_errorHandler__ = __webpack_require__(/*! ./middlewares/errorHandler */ "./node_modules/vitaminjs/src/server/middlewares/errorHandler.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_modules_server_middlewares___ = __webpack_require__(/*! __app_modules__server_middlewares__ */ "./node_modules/vitaminjs/config/utils/emptyArray.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__middlewares_renderer__ = __webpack_require__(/*! ./middlewares/renderer */ "./node_modules/vitaminjs/src/server/middlewares/renderer.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__middlewares_store__ = __webpack_require__(/*! ./middlewares/store */ "./node_modules/vitaminjs/src/server/middlewares/store.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__middlewares_router__ = __webpack_require__(/*! ./middlewares/router */ "./node_modules/vitaminjs/src/server/middlewares/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__middlewares_actionDispatcher__ = __webpack_require__(/*! ./middlewares/actionDispatcher */ "./node_modules/vitaminjs/src/server/middlewares/actionDispatcher.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__middlewares_staticAssetsServer__ = __webpack_require__(/*! ./middlewares/staticAssetsServer */ "./node_modules/vitaminjs/src/server/middlewares/staticAssetsServer.js");




/*
 * We want to load errorHandler first, because usually, the global uncaught exception
 * catch will be instanciated inside it.
 */

// eslint-disable-next-line import/no-extraneous-dependencies, import/first








/* harmony default export */ __webpack_exports__["default"] = __WEBPACK_IMPORTED_MODULE_0_koa_compose___default()([
// Enable Hot Reload when vitamin devServer url differs from app url (externalUrl)
true && function* setCORS(next) {
    this.set('Access-Control-Allow-Origin', '*');yield next;
}, __WEBPACK_IMPORTED_MODULE_2_koa_conditional_get___default()(), __WEBPACK_IMPORTED_MODULE_1_koa_etag___default()(), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__middlewares_errorHandler__["a" /* default */])(), ...__WEBPACK_IMPORTED_MODULE_4__app_modules_server_middlewares___["a" /* default */], __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__middlewares_staticAssetsServer__["a" /* default */])(), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__middlewares_store__["a" /* default */])(), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__middlewares_actionDispatcher__["a" /* default */])(), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__middlewares_router__["a" /* default */])(), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__middlewares_renderer__["a" /* default */])()].filter(Boolean));

/***/ }),

/***/ "./node_modules/vitaminjs/src/server/components/AppContainer.jsx":
/* exports provided: default */
/* exports used: default */
/*!************************************************************!*\
  !*** ./~/vitaminjs/src/server/components/AppContainer.jsx ***!
  \************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_js_string_escape__ = __webpack_require__(/*! js-string-escape */ 36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_js_string_escape___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_js_string_escape__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_modules_redux_stateSerializer___ = __webpack_require__(/*! __app_modules__redux_stateSerializer__ */ "./node_modules/vitaminjs/src/shared/defaultStateSerializer.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config__ = __webpack_require__(/*! ../../../config */ "./node_modules/vitaminjs/config/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__config__);



// eslint-disable-next-line import/no-extraneous-dependencies



const propTypes = {
    initialState: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].object.isRequired,
    children: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].string.isRequired,
    mainEntry: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].string.isRequired
};

/* eslint-disable react/no-danger */
function AppContainer({ initialState, children, mainEntry }) {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        null,
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('script', { async: true, src: `${__WEBPACK_IMPORTED_MODULE_3__config___default.a.publicPath}/${mainEntry}` }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('script', {
            dangerouslySetInnerHTML: { __html: `
                window.__INITIAL_STATE__ = "${__WEBPACK_IMPORTED_MODULE_1_js_string_escape___default()(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__app_modules_redux_stateSerializer___["a" /* stringify */])(initialState))}"`
            }
        }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div', {
            dangerouslySetInnerHTML: { __html: children }
        })
    );
}

AppContainer.propTypes = propTypes;
/* harmony default export */ __webpack_exports__["a"] = AppContainer;

/***/ }),

/***/ "./node_modules/vitaminjs/src/server/components/ErrorPage/Error404.jsx":
/* exports provided: default */
/* exports used: default */
/*!******************************************************************!*\
  !*** ./~/vitaminjs/src/server/components/ErrorPage/Error404.jsx ***!
  \******************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(/*! isomorphic-style-loader/lib/withStyles */ 2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Pineapple__ = __webpack_require__(/*! ./Pineapple */ "./node_modules/vitaminjs/src/server/components/ErrorPage/Pineapple.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__style_css__ = __webpack_require__(/*! ./style.css */ "./node_modules/vitaminjs/src/server/components/ErrorPage/style.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__style_css__);

/* eslint no-script-url: "off" */




const Error404 = () => __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    null,
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: __WEBPACK_IMPORTED_MODULE_3__style_css___default.a.pineapple },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            null,
            '4'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__Pineapple__["a" /* default */], null),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            null,
            '4'
        )
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'h1',
        null,
        'Not Found'
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'h2',
        null,
        'We can\'t seem to find the page you asked'
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'p',
        null,
        'Maybe the resource you were looking for have been moved, or deleted. Maybe it has never existed. Anyway, you can always ',
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'a',
            { href: 'javascript:history.back()' },
            'go back'
        ),
        ' where you came from.'
    )
);

/* harmony default export */ __webpack_exports__["a"] = __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_3__style_css___default.a)(Error404);

/***/ }),

/***/ "./node_modules/vitaminjs/src/server/components/ErrorPage/Error500.jsx":
/* exports provided: default */
/* exports used: default */
/*!******************************************************************!*\
  !*** ./~/vitaminjs/src/server/components/ErrorPage/Error500.jsx ***!
  \******************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(/*! isomorphic-style-loader/lib/withStyles */ 2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Pineapple__ = __webpack_require__(/*! ./Pineapple */ "./node_modules/vitaminjs/src/server/components/ErrorPage/Pineapple.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__style_css__ = __webpack_require__(/*! ./style.css */ "./node_modules/vitaminjs/src/server/components/ErrorPage/style.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__style_css__);





const Error500 = () => __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    null,
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: __WEBPACK_IMPORTED_MODULE_3__style_css___default.a.pineapple },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            null,
            '5'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__Pineapple__["a" /* default */], null),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__Pineapple__["a" /* default */], null)
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'h1',
        null,
        ' Woops... '
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'h2',
        null,
        ' Looks like something went wrong! '
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'p',
        null,
        'Those error are usually tracked, but if the problem persists feel free to contact us. In the meantime, try refreshing.'
    )
);

/* harmony default export */ __webpack_exports__["a"] = __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_3__style_css___default.a)(Error500);

/***/ }),

/***/ "./node_modules/vitaminjs/src/server/components/ErrorPage/Pineapple.jsx":
/* exports provided: default */
/* exports used: default */
/*!*******************************************************************!*\
  !*** ./~/vitaminjs/src/server/components/ErrorPage/Pineapple.jsx ***!
  \*******************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);

/* eslint max-len: "off" */

// Pineapple with love from http://emojione.com/

/* harmony default export */ __webpack_exports__["a"] = function pineapple() {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        "svg",
        { viewBox: "0 0 64 64", enableBackground: "new 0 0 64 64" },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "g",
            { fill: "#64892f" },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m16.935 11.238c4.893 4.894 5.663 8.215 4.092 9.788-1.573 1.572-4.894.802-9.787-4.092-4.895-4.895-7.936-13.632-7.936-13.632s8.736 3.041 13.631 7.936" }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m23.71 14.12c2.924 6.273 2.512 9.657.496 10.597-2.02.94-4.872-.919-7.796-7.193-2.927-6.272-2.795-15.522-2.795-15.522s7.169 5.845 10.1 12.12" }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m29.632 21.245c-2.881 6.294-5.724 8.173-7.746 7.249-2.02-.925-2.458-4.306.422-10.6 2.88-6.294 10.01-12.191 10.01-12.191s.197 9.248-2.683 15.542" }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m26.912 17.956c-.398 6.91-2.365 9.694-4.587 9.565-2.22-.128-3.853-3.12-3.453-10.03.399-6.911 4.899-14.992 4.899-14.992s3.542 8.546 3.141 15.457" }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m33.2 23.979c-4.449 5.302-7.689 6.358-9.394 4.93-1.703-1.429-1.226-4.805 3.224-10.11s12.888-9.09 12.888-9.09-2.268 8.968-6.718 14.27" }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m14.12 23.708c6.273 2.926 9.656 2.514 10.595.498.941-2.02-.918-4.872-7.19-7.797-6.274-2.926-15.524-2.795-15.524-2.795s5.847 7.169 12.12 10.09" }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m21.245 29.631c6.294-2.88 8.174-5.724 7.248-7.746-.924-2.02-4.307-2.457-10.6.423-6.293 2.88-12.189 10.01-12.189 10.01s9.247.196 15.541-2.685" }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m17.957 26.912c6.909-.398 9.693-2.366 9.564-4.587-.128-2.219-3.119-3.853-10.03-3.454s-14.991 4.9-14.991 4.9 8.546 3.541 15.457 3.141" }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m23.98 33.2c5.302-4.448 6.358-7.689 4.929-9.393-1.429-1.704-4.805-1.225-10.11 3.224-5.303 4.449-9.09 12.888-9.09 12.888s8.969-2.269 14.271-6.719" })
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { fill: "#b46137", d: "m55.909 31.2c7.997 7.997 5.762 16.826-1.062 23.649-6.823 6.824-15.653 9.06-23.648 1.063-7.997-7.997-14.739-25.803-7.916-32.627 6.824-6.824 24.63-.082 32.626 7.915" }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "g",
            { fill: "#e7a74f" },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m47.05 47.05c-.973.973-2.11 4.344-1.207 5.248.906.904 4.276-.233 5.25-1.207.972-.973 2.11-4.344 1.206-5.248s-4.277.234-5.249 1.207" }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m52.873 52.873c-.973.974-1.821 4.635-.916 5.539.904.904 7.359-5.552 6.455-6.455-.904-.905-4.566-.057-5.539.916" }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m34.833 34.832c-.974.973-2.11 4.344-1.208 5.248.905.904 4.275-.233 5.249-1.206.973-.974 2.111-4.345 1.207-5.249s-4.276.234-5.248 1.207" }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m40.941 40.941c-.973.973-2.111 4.344-1.207 5.248s4.276-.234 5.249-1.207 2.111-4.344 1.207-5.248-4.276.234-5.249 1.207" }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m28.975 28.973c-.973.973-2.11 4.345-1.207 5.249s4.275-.233 5.249-1.206c.972-.973 2.11-4.346 1.206-5.25s-4.277.234-5.248 1.207" }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m29.13 52c-1.383 1.383-1.01 5.797 3.589 6.958 1.219.308 3.497-7.446 2.593-8.351-1.676-1.675-5.292.502-6.182 1.393" }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m36.449 57.65c-3.495 3.496 2.351 5.733 4.706 3.377.891-.889 1.17-3.402.266-4.307-.903-.904-4.081.041-4.972.93" }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m38.15 48.996c-.973.973-2.101 5.096-1.196 6s5.218-.031 6.191-1c.973-.973 1.526-4.82.622-5.725-.904-.903-4.645-.244-5.617.729" }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m44.34 55.19c-.973.974-1.764 4.691-.859 5.596 1.676 1.678 4.855.346 5.827-.627.973-.973 1.532-4.924.628-5.828-.904-.905-4.622-.114-5.596.859" }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m32.21 43.06c-.974.973-2.355 4.841-1.451 5.745.903.904 5.111-.139 6.083-1.111.973-.973 1.772-4.686.868-5.59-.904-.904-4.527-.017-5.5.956" }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m20.572 31.27c-.972.973-1.421 3.656-.519 4.561.904.904 3.589.454 4.561-.519.973-.974 2.111-4.345 1.207-5.249s-4.275.234-5.249 1.207" }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m20.638 38.05c-.889.89.761 6.509 1.65 5.618.89-.889 2.447-4.68 1.543-5.584s-2.304-.924-3.193-.034" }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m24.321 45.34c-1.161 1.16-1.399 6.221 1.848 6.666 1.247.171 4.154-6.388 3.25-7.292-.904-.905-4.208-.265-5.098.626" }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m26.24 37.09c-.973.973-1.835 4.73-.931 5.636.903.904 4.772.152 5.746-.821.972-.973 1.614-4.731.71-5.636s-4.551-.153-5.525.821" }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m52.01 29.13c1.383-1.383 5.796-1.01 6.957 3.588.309 1.22-7.447 3.498-8.351 2.594-1.675-1.678.502-5.292 1.394-6.182" }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m57.65 36.449c3.495-3.496 5.733 2.35 3.378 4.707-.891.889-3.404 1.169-4.307.266-.905-.905.041-4.083.929-4.973" }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m48.996 38.15c.973-.973 5.097-2.101 6-1.196s-.032 5.218-1.01 6.192c-.973.973-4.819 1.525-5.724.621-.903-.904-.244-4.644.729-5.617" }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m55.19 44.34c.973-.973 4.689-1.764 5.595-.859 1.677 1.677.346 4.855-.627 5.828s-4.923 1.532-5.827.628c-.905-.904-.115-4.623.859-5.597" }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m43.06 32.21c.973-.974 4.841-2.356 5.744-1.451.904.904-.138 5.112-1.111 6.085s-4.685 1.771-5.588.866c-.905-.903-.018-4.527.955-5.5" }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m31.27 20.572c.973-.973 3.656-1.423 4.561-.519s.454 3.588-.519 4.561c-.974.973-4.344 2.111-5.249 1.207-.905-.904.234-4.277 1.207-5.249" }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m38.06 20.637c.888-.889 6.508.761 5.617 1.651-.889.889-4.68 2.447-5.584 1.542s-.924-2.303-.033-3.193" }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m45.34 24.32c1.163-1.161 6.223-1.399 6.667 1.848.172 1.246-6.388 4.154-7.291 3.25-.906-.904-.265-4.208.624-5.098" }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m37.09 26.24c.973-.973 4.73-1.836 5.635-.932s.153 4.773-.82 5.747c-.973.972-4.732 1.614-5.636.71-.905-.905-.153-4.552.821-5.525" })
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "g",
            { fill: "#84b234" },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m21.91 18.431c3.731 3.732 4.512 6.07 3.551 7.03-.96.96-3.298.179-7.03-3.552s-6.482-9.96-6.482-9.96 6.228 2.749 9.96 6.481" }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m25.719 31.508c3.302-2.652 3.783-4.798 2.672-6.076-1.11-1.278-3.392-1.206-6.695 1.447-3.302 2.652-5.267 8.159-5.267 8.159s5.986-.878 9.29-3.53" }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m21.385 24.16c4.657-.046 6.887 1.182 7.234 2.717.351 1.536-1.313 2.8-5.968 2.846-4.657.044-10.892-2.684-10.892-2.684s4.97-2.835 9.626-2.879" }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m20.91 20.394c4.774 1.292 6.702 3.03 6.62 4.51-.081 1.479-2.145 2.14-6.919.848-4.773-1.293-10.368-5.526-10.368-5.526s5.893-1.124 10.667.168" }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m31.509 25.717c-2.652 3.303-4.799 3.783-6.075 2.673-1.279-1.111-1.206-3.393 1.445-6.696 2.653-3.303 8.159-5.266 8.159-5.266s-.877 5.987-3.529 9.289" }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m24.16 21.385c-.046 4.656 1.182 6.885 2.718 7.234 1.535.35 2.801-1.313 2.846-5.969.044-4.657-2.684-10.892-2.684-10.892s-2.835 4.971-2.88 9.627" }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m20.396 20.909c1.291 4.775 3.03 6.703 4.51 6.621 1.479-.083 2.139-2.145.848-6.919-1.295-4.775-5.527-10.37-5.527-10.37s-1.123 5.894.169 10.668" })
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { fill: "#8cc63e", d: "m29.788 22.538c-1.119-2.154-3.348-3.82-3.348-3.82s-.758 1.684-1.186 3.634c-2.123-.919-5.643-2.74-5.643-2.74s1.82 3.521 2.741 5.643c-1.951.428-3.634 1.185-3.634 1.185s1.666 2.228 3.819 3.347c-1.649 2.323-2.462 5.478-2.462 5.478s6.226-1.841 9.785-5.402c3.562-3.562 5.403-9.787 5.403-9.787s-3.152.813-5.475 2.462" })
    );
};

/***/ }),

/***/ "./node_modules/vitaminjs/src/server/components/ErrorPage/index.jsx":
/* exports provided: default */
/* exports used: default */
/*!***************************************************************!*\
  !*** ./~/vitaminjs/src/server/components/ErrorPage/index.jsx ***!
  \***************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_helmet__ = __webpack_require__(/*! react-helmet */ 3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_helmet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_helmet__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(/*! isomorphic-style-loader/lib/withStyles */ 2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__style_css__ = __webpack_require__(/*! ./style.css */ "./node_modules/vitaminjs/src/server/components/ErrorPage/style.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Error404__ = __webpack_require__(/*! ./Error404 */ "./node_modules/vitaminjs/src/server/components/ErrorPage/Error404.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Error500__ = __webpack_require__(/*! ./Error500 */ "./node_modules/vitaminjs/src/server/components/ErrorPage/Error500.jsx");








const propTypes = {
    HTTPStatus: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].number.isRequired,
    error: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].shape({
        name: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].string.isRequired,
        message: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].string.isRequired,
        stack: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].string.isRequired
    })
};

const ErrorPage = ({ HTTPStatus, error }) => __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    { className: __WEBPACK_IMPORTED_MODULE_3__style_css___default.a.page },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_helmet___default.a, {
        link: [{
            href: 'https://fonts.googleapis.com/css?family=Roboto:400,700',
            rel: 'stylesheet',
            type: 'text/css'
        }, {
            href: 'https://fonts.googleapis.com/css?family=Roboto+Mono',
            rel: 'stylesheet',
            type: 'text/css'
        }],
        meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
        title: `${HTTPStatus} - VitaminJS`
    }),
    error ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: __WEBPACK_IMPORTED_MODULE_3__style_css___default.a['stack-container'] },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'h3',
            { className: __WEBPACK_IMPORTED_MODULE_3__style_css___default.a['error-details'] },
            error.name,
            ': ',
            error.message
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'pre',
            null,
            ' ',
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'code',
                null,
                ' ',
                error.stack,
                ' '
            ),
            ' '
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'small',
            null,
            'Note: the stack trace is not available in production. You can customize this page in the config.'
        )
    ) : null,
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: __WEBPACK_IMPORTED_MODULE_3__style_css___default.a.container },
        HTTPStatus === 404 ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__Error404__["a" /* default */], null) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__Error500__["a" /* default */], { HTTPStatus: HTTPStatus, error: error })
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'footer',
        null,
        ' Powered by ',
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'a',
            { href: 'https://github.com/Evaneos/vitaminjs' },
            ' VitaminJS'
        ),
        ' '
    )
);

ErrorPage.propTypes = propTypes;

/* harmony default export */ __webpack_exports__["a"] = __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_3__style_css___default.a)(ErrorPage);

/***/ }),

/***/ "./node_modules/vitaminjs/src/server/components/ErrorPage/style.css":
/* unknown exports provided */
/* exports used: default */
/*!***************************************************************!*\
  !*** ./~/vitaminjs/src/server/components/ErrorPage/style.css ***!
  \***************************************************************/
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(/*! !./../../../../../css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:3]!postcss-loader!./../../../../../postcss-loader!./style.css */ "./node_modules/css-loader/index.js?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:3]!./node_modules/postcss-loader/index.js!./node_modules/postcss-loader/index.js!./node_modules/vitaminjs/src/server/components/ErrorPage/style.css");
    var insertCss = __webpack_require__(/*! ./../../../../../isomorphic-style-loader/lib/insertCss.js */ "./node_modules/isomorphic-style-loader/lib/insertCss.js");

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (module.hot && typeof window !== 'undefined' && window.document) {
      var removeCss = function() {};
      module.hot.accept(/*! !./../../../../../css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:3]!postcss-loader!./../../../../../postcss-loader!./style.css */ "./node_modules/css-loader/index.js?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:3]!./node_modules/postcss-loader/index.js!./node_modules/postcss-loader/index.js!./node_modules/vitaminjs/src/server/components/ErrorPage/style.css", function() {
        content = __webpack_require__(/*! !./../../../../../css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:3]!postcss-loader!./../../../../../postcss-loader!./style.css */ "./node_modules/css-loader/index.js?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:3]!./node_modules/postcss-loader/index.js!./node_modules/postcss-loader/index.js!./node_modules/vitaminjs/src/server/components/ErrorPage/style.css");

        if (typeof content === 'string') {
          content = [[module.i, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),

/***/ "./node_modules/vitaminjs/src/server/components/HtmlLayout.jsx":
/* exports provided: default */
/* exports used: default */
/*!**********************************************************!*\
  !*** ./~/vitaminjs/src/server/components/HtmlLayout.jsx ***!
  \**********************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);



const HelmetHeadPropTypes = __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].shape({
    toComponent: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].func.isRequired
}).isRequired;

const propTypes = {
    head: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].shape({
        title: HelmetHeadPropTypes,
        meta: HelmetHeadPropTypes,
        link: HelmetHeadPropTypes,
        base: HelmetHeadPropTypes,
        script: HelmetHeadPropTypes,
        htmlAttributes: HelmetHeadPropTypes
    }).isRequired,
    style: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].string.isRequired,
    children: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].node.isRequired
};

const HTMLLayout = ({ head, style, children }) =>
// eslint-disable-next-line jsx-a11y/html-has-lang
__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'html',
    head.htmlAttributes.toComponent(),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'head',
        null,
        head.title.toComponent(),
        head.meta.toComponent(),
        head.link.toComponent(),
        head.base.toComponent(),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('style', { dangerouslySetInnerHTML: { __html: style } })
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'body',
        null,
        children,
        head.script.toComponent()
    )
);

HTMLLayout.doctype = '<!doctype html>';
HTMLLayout.propTypes = propTypes;
/* harmony default export */ __webpack_exports__["a"] = HTMLLayout;

/***/ }),

/***/ "./node_modules/vitaminjs/src/server/middlewares/actionDispatcher.js":
/* exports provided: default */
/* exports used: default */
/*!****************************************************************!*\
  !*** ./~/vitaminjs/src/server/middlewares/actionDispatcher.js ***!
  \****************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_modules_server_actionDispatcher___ = __webpack_require__(/*! __app_modules__server_actionDispatcher__ */ "./node_modules/vitaminjs/config/utils/defaultFunction.js");
// eslint-disable-next-line import/no-extraneous-dependencies


/* harmony default export */ __webpack_exports__["a"] = function actionDispatcher0() {
    return function* actionDispatcherMiddleware(next) {
        const { dispatch, getState } = this.state.store;
        const dispatchResult = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__app_modules_server_actionDispatcher___["a" /* default */])(this.request, dispatch, getState);
        if (dispatchResult) {
            yield dispatchResult;
        }
        yield next;
    };
};

/***/ }),

/***/ "./node_modules/vitaminjs/src/server/middlewares/errorHandler.jsx":
/* exports provided: default */
/* exports used: default */
/*!*************************************************************!*\
  !*** ./~/vitaminjs/src/server/middlewares/errorHandler.jsx ***!
  \*************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(/*! babel-runtime/helpers/extends */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(/*! react */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dom_server__ = __webpack_require__(/*! react-dom/server */ 9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dom_server___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_dom_server__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_helmet__ = __webpack_require__(/*! react-helmet */ 3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_helmet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_helmet__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_chalk__ = __webpack_require__(/*! chalk */ 5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_chalk___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_chalk__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_modules_server_onError___ = __webpack_require__(/*! __app_modules__server_onError__ */ "./node_modules/vitaminjs/config/utils/defaultFunction.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_modules_server_ErrorPage___ = __webpack_require__(/*! __app_modules__server_ErrorPage__ */ "./node_modules/vitaminjs/src/server/components/ErrorPage/index.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__shared_components_CSSProvider__ = __webpack_require__(/*! ../../shared/components/CSSProvider */ "./node_modules/vitaminjs/src/shared/components/CSSProvider.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__render__ = __webpack_require__(/*! ../render */ "./node_modules/vitaminjs/src/server/render.jsx");






/* eslint-disable import/no-extraneous-dependencies */


/* eslint-enable import/no-extraneous-dependencies */




const renderRawError = (status, renderingError) => `
            <h2> Error while rendering the ${status} error page.</h2>
            <p>You might want to check your ErrorPage component</p>
            <strong>${renderingError.name}: ${renderingError.message}</strong>
            <pre><code>${renderingError.stack}</pre></code>
            <hr>
        `;

const renderErrorPage = props => {
    const css = [];


    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__render__["b" /* renderLayout */])({
        children: __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement('div', {
            dangerouslySetInnerHTML: { __html: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_react_dom_server__["renderToString"])(__WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                    __WEBPACK_IMPORTED_MODULE_7__shared_components_CSSProvider__["a" /* default */],
                    { insertCss: styles => css.push(styles._getCss()) },
                    __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__app_modules_server_ErrorPage___["a" /* default */], props)
                )) }
        }),
        style: css.join(''),
        head: __WEBPACK_IMPORTED_MODULE_3_react_helmet___default.a.rewind()
    });
};

const onError = context => {
    /* eslint-disable no-console */
    console.error(__WEBPACK_IMPORTED_MODULE_4_chalk___default.a.red(`Error ${context.HTTPStatus}:`), `${context.request.method} ${context.request.url}`);
    if (context.HTTPStatus === 500) {
        console.error(__WEBPACK_IMPORTED_MODULE_4_chalk___default.a.red.bold(context.error.message));
        console.error(__WEBPACK_IMPORTED_MODULE_4_chalk___default.a.grey(context.error.stack));
    }
    /* eslint-enable no-console */
    try {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__app_modules_server_onError___["a" /* default */])(context);
    } catch (err) {
        console.error(__WEBPACK_IMPORTED_MODULE_4_chalk___default.a.red('An error occured while calling the onError function'));
        console.error(err);
    }
};

function getContext(error) {
    return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, error ? { error } : {}, this.state.store ? { state: this.state.store.getState() } : {}, {
        HTTPStatus: this.status,
        request: this.request
    });
}

function renderError(error) {
    try {
        const context = getContext.call(this, error);
        this.body = renderErrorPage(context);
        onError(context);
    } catch (renderingError) {
        this.body = renderRawError(this.status, renderingError);
        onError(getContext.call(this, renderingError));
    }
    this.type = 'html';
}

/* harmony default export */ __webpack_exports__["a"] = function errorHandler() {
    return function* errorHandlerMiddleware(next) {
        try {
            yield next;
        } catch (error) {
            this.status = 500;
            renderError.call(this, error);
        }
        if (this.status === 404) {
            if (this.state.store) {
                renderError.call(this);
            } else {
                // If there is no store, it means that it is a middleware that put a 404, we don't
                // print a vitaminjs 404
                onError(getContext.call(this));
            }
        }
    };
};

/***/ }),

/***/ "./node_modules/vitaminjs/src/server/middlewares/renderer.js":
/* exports provided: default */
/* exports used: default */
/*!********************************************************!*\
  !*** ./~/vitaminjs/src/server/middlewares/renderer.js ***!
  \********************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__render__ = __webpack_require__(/*! ../render */ "./node_modules/vitaminjs/src/server/render.jsx");


/* harmony default export */ __webpack_exports__["a"] = function renderer() {
    return function* rendererMiddleware() {
        const { renderProps, store } = this.state;
        const mainEntry =
        // eslint-disable-next-line no-undef
        (undefined || this.res.locals.webpackStats.toJson().assetsByChunkName).main;
        this.body = yield __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__render__["a" /* default */])(renderProps, store, Array.isArray(mainEntry) ? mainEntry[0] : mainEntry);
    };
};

/***/ }),

/***/ "./node_modules/vitaminjs/src/server/middlewares/router.js":
/* exports provided: default */
/* exports used: default */
/*!******************************************************!*\
  !*** ./~/vitaminjs/src/server/middlewares/router.js ***!
  \******************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__ = __webpack_require__(/*! babel-runtime/core-js/promise */ 7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router__ = __webpack_require__(/*! react-router */ 11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_router__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_modules_routes___ = __webpack_require__(/*! __app_modules__routes__ */ "./src/routes.js");


// eslint-disable-next-line import/no-extraneous-dependencies


const routesWithStore = typeof __WEBPACK_IMPORTED_MODULE_2__app_modules_routes___["a" /* default */] === 'function' ? store => __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__app_modules_routes___["a" /* default */])(store) : () => __WEBPACK_IMPORTED_MODULE_2__app_modules_routes___["a" /* default */];

/* harmony default export */ __webpack_exports__["a"] = function router() {
    return function* routerMiddleware(next) {
        const url = this.req.url;
        const history = this.state.history;

        const appRoutes = yield __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a.resolve(routesWithStore(this.state.store));

        yield new __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a(resolve => {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_react_router__["match"])({ routes: appRoutes, location: url, history }, (error, redirectLocation, renderProps) => {
                if (error) {
                    this.status = 500;
                    this.body = error.message;
                } else if (redirectLocation) {
                    this.redirect((redirectLocation.basename || '') + redirectLocation.pathname + redirectLocation.search);
                } else if (renderProps) {
                    this.status = 200;
                    this.state.renderProps = renderProps;
                } else {
                    this.status = 404;
                    this.body = 'Not found';
                }
                resolve();
            });
        });

        if (this.status === 200) {
            yield next;
        }
    };
};

/***/ }),

/***/ "./node_modules/vitaminjs/src/server/middlewares/staticAssetsServer.js":
/* exports provided: default */
/* exports used: default */
/*!******************************************************************!*\
  !*** ./~/vitaminjs/src/server/middlewares/staticAssetsServer.js ***!
  \******************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_url__ = __webpack_require__(/*! url */ 14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_url___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_url__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_koa_static__ = __webpack_require__(/*! koa-static */ 42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_koa_static___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_koa_static__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_koa_mount__ = __webpack_require__(/*! koa-mount */ 41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_koa_mount___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_koa_mount__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config__ = __webpack_require__(/*! ../../../config */ "./node_modules/vitaminjs/config/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__config__);





const parsedPath = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_url__["parse"])(__WEBPACK_IMPORTED_MODULE_3__config___default.a.publicPath).pathname || '';
const mountPath = parsedPath.slice(__WEBPACK_IMPORTED_MODULE_3__config___default.a.basePath.length);

const servePublic = __WEBPACK_IMPORTED_MODULE_1_koa_static___default()(__WEBPACK_IMPORTED_MODULE_3__config___default.a.client.buildPath);

/* harmony default export */ __webpack_exports__["a"] = __WEBPACK_IMPORTED_MODULE_3__config___default.a.servePublic ? () => mountPath.length ? __WEBPACK_IMPORTED_MODULE_2_koa_mount___default()(mountPath, servePublic) : servePublic : () => null;

/***/ }),

/***/ "./node_modules/vitaminjs/src/server/middlewares/store.js":
/* exports provided: default */
/* exports used: default */
/*!*****************************************************!*\
  !*** ./~/vitaminjs/src/server/middlewares/store.js ***!
  \*****************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_history__ = __webpack_require__(/*! history */ 35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_history___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_history__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_modules_redux_reducers___ = __webpack_require__(/*! __app_modules__redux_reducers__ */ "./src/reducers.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_modules_redux_middlewares___ = __webpack_require__(/*! __app_modules__redux_middlewares__ */ "./node_modules/vitaminjs/config/utils/emptyArray.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_store__ = __webpack_require__(/*! ../../shared/store */ "./node_modules/vitaminjs/src/shared/store.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__config__ = __webpack_require__(/*! ../../../config */ "./node_modules/vitaminjs/config/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__config___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__config__);

/* eslint-disable import/no-extraneous-dependencies */


/* eslint-enable import/no-extraneous-dependencies */



/* harmony default export */ __webpack_exports__["a"] = function store() {
    return function* storeMiddleware(next) {
        const history = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_history__["useQueries"])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_history__["useBasename"])(__WEBPACK_IMPORTED_MODULE_0_history__["createMemoryHistory"]))({
            basename: __WEBPACK_IMPORTED_MODULE_4__config___default.a.basePath,
            entries: [this.req.url]
        });
        this.state.history = history;
        this.state.store = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__shared_store__["a" /* create */])(history, __WEBPACK_IMPORTED_MODULE_1__app_modules_redux_reducers___["a" /* default */], __WEBPACK_IMPORTED_MODULE_2__app_modules_redux_middlewares___["a" /* default */]);
        yield next;
    };
};

/***/ }),

/***/ "./node_modules/vitaminjs/src/server/render.jsx":
/* exports provided: renderLayout, default */
/* exports used: default, renderLayout */
/*!*******************************************!*\
  !*** ./~/vitaminjs/src/server/render.jsx ***!
  \*******************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(/*! babel-runtime/helpers/extends */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise__ = __webpack_require__(/*! babel-runtime/core-js/promise */ 7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_objectWithoutProperties__ = __webpack_require__(/*! babel-runtime/helpers/objectWithoutProperties */ 32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_objectWithoutProperties___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_objectWithoutProperties__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react__ = __webpack_require__(/*! react */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_async_props__ = __webpack_require__(/*! async-props */ 15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_async_props___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_async_props__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_dom_server__ = __webpack_require__(/*! react-dom/server */ 9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_dom_server___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react_dom_server__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_helmet__ = __webpack_require__(/*! react-helmet */ 3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_helmet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react_helmet__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_modules_server_layout___ = __webpack_require__(/*! __app_modules__server_layout__ */ "./node_modules/vitaminjs/src/server/components/HtmlLayout.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__config__ = __webpack_require__(/*! ../../config */ "./node_modules/vitaminjs/config/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__config___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__config__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_AppContainer__ = __webpack_require__(/*! ./components/AppContainer */ "./node_modules/vitaminjs/src/server/components/AppContainer.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__shared_components_App__ = __webpack_require__(/*! ../shared/components/App */ "./node_modules/vitaminjs/src/shared/components/App.jsx");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return renderLayout; });







// eslint-disable-next-line import/no-extraneous-dependencies






const renderLayout = (_ref) => {
    let { children } = _ref,
        props = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_objectWithoutProperties___default()(_ref, ['children']);

    return `${__WEBPACK_IMPORTED_MODULE_7__app_modules_server_layout___["a" /* default */].doctype ? `${__WEBPACK_IMPORTED_MODULE_7__app_modules_server_layout___["a" /* default */].doctype}\n` : ''}${__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5_react_dom_server__["renderToStaticMarkup"])(__WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_7__app_modules_server_layout___["a" /* default */],
        props,
        __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
            'div',
            { id: __WEBPACK_IMPORTED_MODULE_8__config___default.a.rootElementId },
            children
        )
    ))}`;
};

// Return a promise that resolves to the HTML string

/* harmony default export */ __webpack_exports__["a"] = function render(renderProps, store, mainEntry) {
    const css = [];
    const insertCss = styles => css.push(styles._getCss());
    return new __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a((resolve, reject) => __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_async_props__["loadPropsOnServer"])(renderProps, { dispatch: store.dispatch }, (error, asyncProps) => {
        if (error) {
            return reject(error);
        }
        try {
            return resolve(renderLayout({
                children: __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
                    __WEBPACK_IMPORTED_MODULE_9__components_AppContainer__["a" /* default */],
                    {
                        initialState: store.getState(),
                        mainEntry: mainEntry
                    },
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5_react_dom_server__["renderToString"])(__WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
                        __WEBPACK_IMPORTED_MODULE_10__shared_components_App__["a" /* default */],
                        { store: store, insertCss: insertCss },
                        __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_async_props___default.a, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, renderProps, asyncProps))
                    ))
                ),
                style: css.join(''),
                head: __WEBPACK_IMPORTED_MODULE_6_react_helmet___default.a.rewind()
            }));
        } catch (err) {
            return reject(err);
        }
    }));
};

/***/ }),

/***/ "./node_modules/vitaminjs/src/server/server.js":
/* unknown exports provided */
/* all exports used */
/*!******************************************!*\
  !*** ./~/vitaminjs/src/server/server.js ***!
  \******************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(/*! babel-runtime/helpers/extends */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_url__ = __webpack_require__(/*! url */ 14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_url___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_url__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_koa__ = __webpack_require__(/*! koa */ 37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_koa___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_koa__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_express__ = __webpack_require__(/*! express */ 34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_chalk__ = __webpack_require__(/*! chalk */ 5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_chalk___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_chalk__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_node_fetch__ = __webpack_require__(/*! node-fetch */ 44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_node_fetch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_node_fetch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_readline__ = __webpack_require__(/*! readline */ 45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_readline___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_readline__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app__ = __webpack_require__(/*! ./app */ "./node_modules/vitaminjs/src/server/app.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__config__ = __webpack_require__(/*! ../../config */ "./node_modules/vitaminjs/config/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__config___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__config__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__config_build_webpack_config_client__ = __webpack_require__(/*! ../../config/build/webpack.config.client */ "./node_modules/vitaminjs/config/build/webpack.config.client.js");

/* eslint-disable global-require, no-console */












global.fetch = __WEBPACK_IMPORTED_MODULE_5_node_fetch___default.a;

let currentApp = __WEBPACK_IMPORTED_MODULE_7__app__["default"];
function appServer() {
    const server = __WEBPACK_IMPORTED_MODULE_2_koa___default()();

    server.use(function* appWrapper(next) {
        yield currentApp.call(this, next);
    });
    return server.callback();
}

const mountedServer = __WEBPACK_IMPORTED_MODULE_3_express___default()();

if (true) {

    mountedServer.use((() => {
        const server = __WEBPACK_IMPORTED_MODULE_3_express___default()();
        const webpack = __webpack_require__(/*! webpack */ 6);
        const clientBuildConfig = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__config_build_webpack_config_client__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({
            hot: true,
            dev: true
        }, __WEBPACK_IMPORTED_MODULE_8__config___default.a));

        const compiler = webpack(clientBuildConfig);
        let clientBuilt = false;
        const parsedPublicPath = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_url__["parse"])(__WEBPACK_IMPORTED_MODULE_8__config___default.a.publicPath).pathname || '';
        server.use(__webpack_require__(/*! webpack-dev-middleware */ 48)(compiler, {
            quiet: true,
            noInfo: true,
            publicPath: parsedPublicPath,
            reporter: stats => {
                if (stats.hasErrors || clientBuilt) {
                    return;
                }
                clientBuilt = true;
                process.stdout.write(`\x1b[0G${__WEBPACK_IMPORTED_MODULE_4_chalk___default.a.green('\u2713')} Client bundle(s) successfully ${__WEBPACK_IMPORTED_MODULE_4_chalk___default.a.bold('built in memory')}\n\n`);
            },
            serverSideRender: true
        }));

        const hmrPath = `${parsedPublicPath}/__webpack_hmr`;
        server.use(__webpack_require__(/*! webpack-hot-middleware */ 49)(compiler, {
            log: () => {},
            path: hmrPath,
            reload: true
        }));

        return server;
    })());
    module.hot.accept(/*! ./app */ "./node_modules/vitaminjs/src/server/app.js", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ __WEBPACK_IMPORTED_MODULE_7__app__ = __webpack_require__(/*! ./app */ "./node_modules/vitaminjs/src/server/app.js"); (() => {
        try {
            currentApp = __webpack_require__(/*! ./app */ "./node_modules/vitaminjs/src/server/app.js").default;
        } catch (e) {
            console.error(e);
        }
    })(__WEBPACK_OUTDATED_DEPENDENCIES__); });
}

const { port, host } = __WEBPACK_IMPORTED_MODULE_8__config___default.a.server;
mountedServer.use(__WEBPACK_IMPORTED_MODULE_8__config___default.a.basePath, appServer());

mountedServer.listen(port, host, () => {
    __WEBPACK_IMPORTED_MODULE_6_readline___default.a.clearLine(process.stdout);
    __WEBPACK_IMPORTED_MODULE_6_readline___default.a.cursorTo(0, process.stdout);
    process.stdout.write(`\x1b[0G${__WEBPACK_IMPORTED_MODULE_4_chalk___default.a.green('\u2713')} Server listening on: ${__WEBPACK_IMPORTED_MODULE_4_chalk___default.a.bold.underline(`http://${host}:${port}${__WEBPACK_IMPORTED_MODULE_8__config___default.a.basePath}`)}\n`);
    if (true) {
        console.log(`${__WEBPACK_IMPORTED_MODULE_4_chalk___default.a.green('\u2713')} ${__WEBPACK_IMPORTED_MODULE_4_chalk___default.a.bold('Hot module reload')} activated`);
        process.stdout.write(`\x1b[0G${__WEBPACK_IMPORTED_MODULE_4_chalk___default.a.blue('\uD83D\uDD50  Building client bundle [in memory]...')}`);
    }
});

/***/ }),

/***/ "./node_modules/vitaminjs/src/shared/components/App.jsx":
/* exports provided: default */
/* exports used: default */
/*!***************************************************!*\
  !*** ./~/vitaminjs/src/shared/components/App.jsx ***!
  \***************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(/*! react-redux */ 10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__CSSProvider__ = __webpack_require__(/*! ./CSSProvider */ "./node_modules/vitaminjs/src/shared/components/CSSProvider.js");





const propTypes = {
    store: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].object.isRequired,
    insertCss: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].func.isRequired,
    children: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].element.isRequired
};

function App({ store, insertCss, children }) {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_2__CSSProvider__["a" /* default */],
        { insertCss: insertCss },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_1_react_redux__["Provider"],
            { store: store },
            children
        )
    );
}

App.propTypes = propTypes;
/* harmony default export */ __webpack_exports__["a"] = App;

/***/ }),

/***/ "./node_modules/vitaminjs/src/shared/components/CSSProvider.js":
/* exports provided: default */
/* exports used: default */
/*!**********************************************************!*\
  !*** ./~/vitaminjs/src/shared/components/CSSProvider.js ***!
  \**********************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


class CSSProvider extends __WEBPACK_IMPORTED_MODULE_0_react__["Component"] {

    getChildContext() {
        return {
            insertCss: this.props.insertCss
        };
    }

    render() {
        return this.props.children;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CSSProvider;

CSSProvider.propTypes = {
    insertCss: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].func.isRequired,
    children: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].element.isRequired
};
CSSProvider.childContextTypes = {
    insertCss: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].func.isRequired
};

/***/ }),

/***/ "./node_modules/vitaminjs/src/shared/defaultStateSerializer.js":
/* exports provided: stringify, parse */
/* exports used: stringify */
/*!**********************************************************!*\
  !*** ./~/vitaminjs/src/shared/defaultStateSerializer.js ***!
  \**********************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify__ = __webpack_require__(/*! babel-runtime/core-js/json/stringify */ 4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify__);

const stringify = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default.a;
/* harmony export (immutable) */ __webpack_exports__["a"] = stringify;

const parse = JSON.parse;
/* unused harmony export parse */


/***/ }),

/***/ "./node_modules/vitaminjs/src/shared/devTools.js":
/* exports provided: default */
/* exports used: default */
/*!********************************************!*\
  !*** ./~/vitaminjs/src/shared/devTools.js ***!
  \********************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const storeEnhancers = [];

if (typeof window !== 'undefined' && typeof window.devToolsExtension !== 'undefined') {
    storeEnhancers.push(window.devToolsExtension());
}


/* harmony default export */ __webpack_exports__["a"] = storeEnhancers;

/***/ }),

/***/ "./node_modules/vitaminjs/src/shared/index.js":
/* unknown exports provided */
/* exports used: Route, Helmet, withStyles, compose, connect */
/*!*****************************************!*\
  !*** ./~/vitaminjs/src/shared/index.js ***!
  \*****************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(/*! isomorphic-style-loader/lib/withStyles */ 2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_isomorphic_style_loader_lib_withStyles__);
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "withStyles", function() { return __WEBPACK_IMPORTED_MODULE_0_isomorphic_style_loader_lib_withStyles___default.a; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_helmet__ = __webpack_require__(/*! react-helmet */ 3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_helmet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_helmet__);
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "Helmet", function() { return __WEBPACK_IMPORTED_MODULE_1_react_helmet___default.a; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_redux__ = __webpack_require__(/*! redux */ 13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_redux__);
/* unused harmony reexport combineReducers */
/* unused harmony reexport bindActionCreators */
/* unused harmony reexport applyMiddleware */
/* harmony reexport (binding) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_2_redux__, "compose")) __webpack_require__.d(__webpack_exports__, "compose", function() { return __WEBPACK_IMPORTED_MODULE_2_redux__["compose"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_redux__ = __webpack_require__(/*! react-redux */ 10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_redux__);
/* unused harmony reexport Provider */
/* unused harmony reexport connectAdvanced */
/* harmony reexport (binding) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_3_react_redux__, "connect")) __webpack_require__.d(__webpack_exports__, "connect", function() { return __WEBPACK_IMPORTED_MODULE_3_react_redux__["connect"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_router__ = __webpack_require__(/*! react-router */ 11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react_router__);
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_4_react_router__, "Route")) __webpack_require__.d(__webpack_exports__, "Route", function() { return __WEBPACK_IMPORTED_MODULE_4_react_router__["Route"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_router_redux__ = __webpack_require__(/*! react-router-redux */ 12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_router_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react_router_redux__);
/* unused harmony reexport LOCATION_CHANGE */
/* unused harmony reexport routerReducer */
/* unused harmony reexport CALL_HISTORY_METHOD */
/* unused harmony reexport push */
/* unused harmony reexport replace */
/* unused harmony reexport go */
/* unused harmony reexport goBack */
/* unused harmony reexport goForward */
/* unused harmony reexport routerActions */
/* unused harmony reexport routerMiddleware */











/***/ }),

/***/ "./node_modules/vitaminjs/src/shared/store.js":
/* exports provided: createRootReducer, create */
/* exports used: create */
/*!*****************************************!*\
  !*** ./~/vitaminjs/src/shared/store.js ***!
  \*****************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(/*! babel-runtime/helpers/extends */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux__ = __webpack_require__(/*! redux */ 13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_router_redux__ = __webpack_require__(/*! react-router-redux */ 12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_router_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_router_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_redux_thunk__ = __webpack_require__(/*! redux-thunk */ 46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_redux_thunk___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_redux_thunk__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_modules_redux_enhancers___ = __webpack_require__(/*! __app_modules__redux_enhancers__ */ "./node_modules/vitaminjs/config/utils/emptyArray.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__devTools__ = __webpack_require__(/*! ./devTools */ "./node_modules/vitaminjs/src/shared/devTools.js");
/* unused harmony export createRootReducer */
/* harmony export (immutable) */ __webpack_exports__["a"] = create;




/* eslint-disable import/no-extraneous-dependencies */



function createRootReducer(reducers) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_redux__["combineReducers"])(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, reducers, { routing: __WEBPACK_IMPORTED_MODULE_2_react_router_redux__["routerReducer"] }));
}

function create(history, reducers, middlewares, initialState) {
    const createStoreWithMiddleware = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_redux__["compose"])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_redux__["applyMiddleware"])(...middlewares, __WEBPACK_IMPORTED_MODULE_3_redux_thunk___default.a, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_react_router_redux__["routerMiddleware"])(history)), ...__WEBPACK_IMPORTED_MODULE_5__devTools__["a" /* default */], ...__WEBPACK_IMPORTED_MODULE_4__app_modules_redux_enhancers___["a" /* default */])(__WEBPACK_IMPORTED_MODULE_1_redux__["createStore"]);

    const rootReducer = createRootReducer(reducers);
    const store = createStoreWithMiddleware(rootReducer, initialState);

    return store;
}

/***/ }),

/***/ "./src/Counter.jsx":
/* exports provided: default */
/* exports used: default */
/*!*************************!*\
  !*** ./src/Counter.jsx ***!
  \*************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vitaminjs__ = __webpack_require__(/*! vitaminjs */ "./node_modules/vitaminjs/src/shared/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__style_css__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__style_css__);





const Counter = ({ value, onIncrement, onDecrement }) => __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    null,
    ' Counter: ',
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'span',
        { className: __WEBPACK_IMPORTED_MODULE_2__style_css___default.a.value },
        value
    ),
    ' ',
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('br', null),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'button',
        { className: __WEBPACK_IMPORTED_MODULE_2__style_css___default.a.button, onClick: onIncrement },
        ' +1 '
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'button',
        { className: __WEBPACK_IMPORTED_MODULE_2__style_css___default.a.button, onClick: onDecrement },
        ' -1 '
    )
);

Counter.propTypes = {
    value: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].number.isRequired,
    onIncrement: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].func.isRequired,
    onDecrement: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].func.isRequired
};

const mapStateToProps = ({ counter }) => ({ value: counter });
const mapDispatchToProps = dispatch => ({
    onIncrement: () => dispatch({ type: 'INCREMENT' }),
    onDecrement: () => dispatch({ type: 'DECREMENT' })
});

/* harmony default export */ __webpack_exports__["a"] = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_vitaminjs__["compose"])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_vitaminjs__["connect"])(mapStateToProps, mapDispatchToProps), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_vitaminjs__["withStyles"])(__WEBPACK_IMPORTED_MODULE_2__style_css___default.a))(Counter);

/***/ }),

/***/ "./src/Index.jsx":
/* exports provided: default */
/* exports used: default */
/*!***********************!*\
  !*** ./src/Index.jsx ***!
  \***********************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vitaminjs__ = __webpack_require__(/*! vitaminjs */ "./node_modules/vitaminjs/src/shared/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__style_css__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Counter__ = __webpack_require__(/*! ./Counter */ "./src/Counter.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__logo_png__ = __webpack_require__(/*! ./logo.png */ "./src/logo.png");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__logo_png___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__logo_png__);






const Index = () => __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    { className: __WEBPACK_IMPORTED_MODULE_2__style_css___default.a.app },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_vitaminjs__["Helmet"], {
        title: 'VitaminJS',
        meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }]
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: __WEBPACK_IMPORTED_MODULE_2__style_css___default.a.header },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img', { src: __WEBPACK_IMPORTED_MODULE_4__logo_png___default.a, alt: 'logo', className: __WEBPACK_IMPORTED_MODULE_2__style_css___default.a.logo })
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'p',
        { className: __WEBPACK_IMPORTED_MODULE_2__style_css___default.a.message },
        'WelcomeWelcomeWelcomeWelcomeWelcomeWelcome !',
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('br', null),
        'Here you can see an example using ',
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'a',
            { href: 'https://facebook.github.io/react/' },
            'React'
        ),
        ' ',
        'with an implementation of ',
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'a',
            { href: 'http://redux.js.org/' },
            'redux'
        ),
        '.',
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('br', null),
        'Take a look at',
        ' ',
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'a',
            { href: 'https://github.com/kriasoft/isomorphic-style-loader' },
            'CSS Modules'
        ),
        ' for the style.',
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('br', null),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'a',
            { href: 'https://github.com/nfl/react-helmet' },
            'Helmet'
        ),
        ' ',
        'is there to manage your head !',
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('br', null),
        'Try to make some changes and save to reload.'
    ),
    'Redux demo:',
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: __WEBPACK_IMPORTED_MODULE_2__style_css___default.a.counter },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__Counter__["a" /* default */], null)
    )
);

/* harmony default export */ __webpack_exports__["a"] = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_vitaminjs__["withStyles"])(__WEBPACK_IMPORTED_MODULE_2__style_css___default.a)(Index);

/***/ }),

/***/ "./src/logo.png":
/* unknown exports provided */
/* exports used: default */
/*!**********************!*\
  !*** ./src/logo.png ***!
  \**********************/
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "files/cc40432df7e479dd6f456e5a7b7f854c.png";

/***/ }),

/***/ "./src/reducers.js":
/* exports provided: default */
/* exports used: default */
/*!*************************!*\
  !*** ./src/reducers.js ***!
  \*************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const counter = (state = 0, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state == 0 ? state : state - 1;
        default:
            return state;
    }
};

/* harmony default export */ __webpack_exports__["a"] = { counter };

/***/ }),

/***/ "./src/routes.js":
/* exports provided: default */
/* exports used: default */
/*!***********************!*\
  !*** ./src/routes.js ***!
  \***********************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vitaminjs__ = __webpack_require__(/*! vitaminjs */ "./node_modules/vitaminjs/src/shared/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Index__ = __webpack_require__(/*! ./Index */ "./src/Index.jsx");




/* harmony default export */ __webpack_exports__["a"] = __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_vitaminjs__["Route"], { path: '/', component: __WEBPACK_IMPORTED_MODULE_2__Index__["a" /* default */] });

/***/ }),

/***/ "./src/style.css":
/* unknown exports provided */
/* exports used: default */
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(/*! !./../~/css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:3]!postcss-loader!./../~/postcss-loader!./style.css */ "./node_modules/css-loader/index.js?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:3]!./node_modules/postcss-loader/index.js!./node_modules/postcss-loader/index.js!./src/style.css");
    var insertCss = __webpack_require__(/*! ./../~/isomorphic-style-loader/lib/insertCss.js */ "./node_modules/isomorphic-style-loader/lib/insertCss.js");

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (module.hot && typeof window !== 'undefined' && window.document) {
      var removeCss = function() {};
      module.hot.accept(/*! !./../~/css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:3]!postcss-loader!./../~/postcss-loader!./style.css */ "./node_modules/css-loader/index.js?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:3]!./node_modules/postcss-loader/index.js!./node_modules/postcss-loader/index.js!./src/style.css", function() {
        content = __webpack_require__(/*! !./../~/css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:3]!postcss-loader!./../~/postcss-loader!./style.css */ "./node_modules/css-loader/index.js?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:3]!./node_modules/postcss-loader/index.js!./node_modules/postcss-loader/index.js!./src/style.css");

        if (typeof content === 'string') {
          content = [[module.i, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),

/***/ 0:
/* unknown exports provided */
/* exports used: default, PropTypes, Component */
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ 1:
/* unknown exports provided */
/* exports used: default */
/*!************************************************!*\
  !*** external "babel-runtime/helpers/extends" ***!
  \************************************************/
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/extends");

/***/ }),

/***/ 10:
/* unknown exports provided */
/* exports used: Provider, connect */
/*!******************************!*\
  !*** external "react-redux" ***!
  \******************************/
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),

/***/ 11:
/* unknown exports provided */
/* exports used: match, Route */
/*!*******************************!*\
  !*** external "react-router" ***!
  \*******************************/
/***/ (function(module, exports) {

module.exports = require("react-router");

/***/ }),

/***/ 12:
/* unknown exports provided */
/* exports used: routerReducer, routerMiddleware */
/*!*************************************!*\
  !*** external "react-router-redux" ***!
  \*************************************/
/***/ (function(module, exports) {

module.exports = require("react-router-redux");

/***/ }),

/***/ 13:
/* unknown exports provided */
/* exports used: compose, combineReducers, applyMiddleware, createStore */
/*!************************!*\
  !*** external "redux" ***!
  \************************/
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),

/***/ 14:
/* unknown exports provided */
/* exports used: parse */
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),

/***/ 15:
/* unknown exports provided */
/* exports used: loadPropsOnServer, default */
/*!******************************!*\
  !*** external "async-props" ***!
  \******************************/
/***/ (function(module, exports) {

module.exports = require("async-props");

/***/ }),

/***/ 16:
/* unknown exports provided */
/* exports used: default */
/*!*******************************!*\
  !*** external "autoprefixer" ***!
  \*******************************/
/***/ (function(module, exports) {

module.exports = require("autoprefixer");

/***/ }),

/***/ 17:
/* unknown exports provided */
/* exports used: default */
/*!*********************************************************!*\
  !*** external "babel-plugin-discard-module-references" ***!
  \*********************************************************/
/***/ (function(module, exports) {

module.exports = require("babel-plugin-discard-module-references");

/***/ }),

/***/ 18:
/* unknown exports provided */
/* exports used: default */
/*!************************************************************!*\
  !*** external "babel-plugin-minify-dead-code-elimination" ***!
  \************************************************************/
/***/ (function(module, exports) {

module.exports = require("babel-plugin-minify-dead-code-elimination");

/***/ }),

/***/ 19:
/* unknown exports provided */
/* exports used: default */
/*!**********************************************************!*\
  !*** external "babel-plugin-minify-guarded-expressions" ***!
  \**********************************************************/
/***/ (function(module, exports) {

module.exports = require("babel-plugin-minify-guarded-expressions");

/***/ }),

/***/ 2:
/* unknown exports provided */
/* exports used: default */
/*!*********************************************************!*\
  !*** external "isomorphic-style-loader/lib/withStyles" ***!
  \*********************************************************/
/***/ (function(module, exports) {

module.exports = require("isomorphic-style-loader/lib/withStyles");

/***/ }),

/***/ 20:
/* unknown exports provided */
/* exports used: default */
/*!**********************************************!*\
  !*** external "babel-plugin-minify-replace" ***!
  \**********************************************/
/***/ (function(module, exports) {

module.exports = require("babel-plugin-minify-replace");

/***/ }),

/***/ 21:
/* unknown exports provided */
/* exports used: default */
/*!*********************************************!*\
  !*** external "babel-plugin-react-require" ***!
  \*********************************************/
/***/ (function(module, exports) {

module.exports = require("babel-plugin-react-require");

/***/ }),

/***/ 22:
/* unknown exports provided */
/* exports used: default */
/*!**************************************************************!*\
  !*** external "babel-plugin-transform-es2015-function-name" ***!
  \**************************************************************/
/***/ (function(module, exports) {

module.exports = require("babel-plugin-transform-es2015-function-name");

/***/ }),

/***/ 23:
/* unknown exports provided */
/* exports used: default */
/*!********************************************************************!*\
  !*** external "babel-plugin-transform-export-default-name-forked" ***!
  \********************************************************************/
/***/ (function(module, exports) {

module.exports = require("babel-plugin-transform-export-default-name-forked");

/***/ }),

/***/ 24:
/* unknown exports provided */
/* exports used: default */
/*!*********************************************************!*\
  !*** external "babel-plugin-transform-node-env-inline" ***!
  \*********************************************************/
/***/ (function(module, exports) {

module.exports = require("babel-plugin-transform-node-env-inline");

/***/ }),

/***/ 25:
/* unknown exports provided */
/* exports used: default */
/*!*************************************************!*\
  !*** external "babel-plugin-transform-runtime" ***!
  \*************************************************/
/***/ (function(module, exports) {

module.exports = require("babel-plugin-transform-runtime");

/***/ }),

/***/ 26:
/* unknown exports provided */
/* exports used: buildPreset */
/*!**************************************!*\
  !*** external "babel-preset-es2015" ***!
  \**************************************/
/***/ (function(module, exports) {

module.exports = require("babel-preset-es2015");

/***/ }),

/***/ 27:
/* unknown exports provided */
/* exports used: default */
/*!**************************************!*\
  !*** external "babel-preset-es2016" ***!
  \**************************************/
/***/ (function(module, exports) {

module.exports = require("babel-preset-es2016");

/***/ }),

/***/ 28:
/* unknown exports provided */
/* exports used: default */
/*!**************************************!*\
  !*** external "babel-preset-es2017" ***!
  \**************************************/
/***/ (function(module, exports) {

module.exports = require("babel-preset-es2017");

/***/ }),

/***/ 29:
/* unknown exports provided */
/* exports used: default */
/*!*************************************!*\
  !*** external "babel-preset-react" ***!
  \*************************************/
/***/ (function(module, exports) {

module.exports = require("babel-preset-react");

/***/ }),

/***/ 3:
/* unknown exports provided */
/* exports used: default */
/*!*******************************!*\
  !*** external "react-helmet" ***!
  \*******************************/
/***/ (function(module, exports) {

module.exports = require("react-helmet");

/***/ }),

/***/ 30:
/* unknown exports provided */
/* exports used: default */
/*!***************************************!*\
  !*** external "babel-preset-stage-1" ***!
  \***************************************/
/***/ (function(module, exports) {

module.exports = require("babel-preset-stage-1");

/***/ }),

/***/ 31:
/* unknown exports provided */
/* all exports used */
/*!*****************************************************!*\
  !*** external "babel-runtime/core-js/get-iterator" ***!
  \*****************************************************/
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/get-iterator");

/***/ }),

/***/ 32:
/* unknown exports provided */
/* exports used: default */
/*!****************************************************************!*\
  !*** external "babel-runtime/helpers/objectWithoutProperties" ***!
  \****************************************************************/
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/objectWithoutProperties");

/***/ }),

/***/ 33:
/* unknown exports provided */
/* all exports used */
/*!******************************************************!*\
  !*** external "babel-runtime/helpers/slicedToArray" ***!
  \******************************************************/
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/slicedToArray");

/***/ }),

/***/ 34:
/* unknown exports provided */
/* exports used: default */
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ 35:
/* unknown exports provided */
/* exports used: useQueries, useBasename, createMemoryHistory */
/*!**************************!*\
  !*** external "history" ***!
  \**************************/
/***/ (function(module, exports) {

module.exports = require("history");

/***/ }),

/***/ 36:
/* unknown exports provided */
/* exports used: default */
/*!***********************************!*\
  !*** external "js-string-escape" ***!
  \***********************************/
/***/ (function(module, exports) {

module.exports = require("js-string-escape");

/***/ }),

/***/ 37:
/* unknown exports provided */
/* exports used: default */
/*!**********************!*\
  !*** external "koa" ***!
  \**********************/
/***/ (function(module, exports) {

module.exports = require("koa");

/***/ }),

/***/ 38:
/* unknown exports provided */
/* exports used: default */
/*!******************************!*\
  !*** external "koa-compose" ***!
  \******************************/
/***/ (function(module, exports) {

module.exports = require("koa-compose");

/***/ }),

/***/ 39:
/* unknown exports provided */
/* exports used: default */
/*!**************************************!*\
  !*** external "koa-conditional-get" ***!
  \**************************************/
/***/ (function(module, exports) {

module.exports = require("koa-conditional-get");

/***/ }),

/***/ 4:
/* unknown exports provided */
/* all exports used */
/*!*******************************************************!*\
  !*** external "babel-runtime/core-js/json/stringify" ***!
  \*******************************************************/
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/json/stringify");

/***/ }),

/***/ 40:
/* unknown exports provided */
/* exports used: default */
/*!***************************!*\
  !*** external "koa-etag" ***!
  \***************************/
/***/ (function(module, exports) {

module.exports = require("koa-etag");

/***/ }),

/***/ 41:
/* unknown exports provided */
/* exports used: default */
/*!****************************!*\
  !*** external "koa-mount" ***!
  \****************************/
/***/ (function(module, exports) {

module.exports = require("koa-mount");

/***/ }),

/***/ 42:
/* unknown exports provided */
/* exports used: default */
/*!*****************************!*\
  !*** external "koa-static" ***!
  \*****************************/
/***/ (function(module, exports) {

module.exports = require("koa-static");

/***/ }),

/***/ 43:
/* unknown exports provided */
/* exports used: default */
/*!***********************************!*\
  !*** external "lodash.mergewith" ***!
  \***********************************/
/***/ (function(module, exports) {

module.exports = require("lodash.mergewith");

/***/ }),

/***/ 44:
/* unknown exports provided */
/* exports used: default */
/*!*****************************!*\
  !*** external "node-fetch" ***!
  \*****************************/
/***/ (function(module, exports) {

module.exports = require("node-fetch");

/***/ }),

/***/ 45:
/* unknown exports provided */
/* exports used: default */
/*!***************************!*\
  !*** external "readline" ***!
  \***************************/
/***/ (function(module, exports) {

module.exports = require("readline");

/***/ }),

/***/ 46:
/* unknown exports provided */
/* exports used: default */
/*!******************************!*\
  !*** external "redux-thunk" ***!
  \******************************/
/***/ (function(module, exports) {

module.exports = require("redux-thunk");

/***/ }),

/***/ 47:
/* unknown exports provided */
/* exports used: default */
/*!***********************************************!*\
  !*** external "serviceworker-webpack-plugin" ***!
  \***********************************************/
/***/ (function(module, exports) {

module.exports = require("serviceworker-webpack-plugin");

/***/ }),

/***/ 48:
/* unknown exports provided */
/* all exports used */
/*!*****************************************!*\
  !*** external "webpack-dev-middleware" ***!
  \*****************************************/
/***/ (function(module, exports) {

module.exports = require("webpack-dev-middleware");

/***/ }),

/***/ 49:
/* unknown exports provided */
/* all exports used */
/*!*****************************************!*\
  !*** external "webpack-hot-middleware" ***!
  \*****************************************/
/***/ (function(module, exports) {

module.exports = require("webpack-hot-middleware");

/***/ }),

/***/ 5:
/* unknown exports provided */
/* exports used: default */
/*!************************!*\
  !*** external "chalk" ***!
  \************************/
/***/ (function(module, exports) {

module.exports = require("chalk");

/***/ }),

/***/ 50:
/* unknown exports provided */
/* all exports used */
/*!**********************************************************************************!*\
  !*** multi ./~/vitaminjs/config/utils/hot.js ./~/vitaminjs/src/server/server.js ***!
  \**********************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /Users/n3x7/Documents/Etna/GPE/node_modules/vitaminjs/config/utils/hot.js */"./node_modules/vitaminjs/config/utils/hot.js");
module.exports = __webpack_require__(/*! /Users/n3x7/Documents/Etna/GPE/node_modules/vitaminjs/src/server/server.js */"./node_modules/vitaminjs/src/server/server.js");


/***/ }),

/***/ 6:
/* unknown exports provided */
/* all exports used */
/*!**************************!*\
  !*** external "webpack" ***!
  \**************************/
/***/ (function(module, exports) {

module.exports = require("webpack");

/***/ }),

/***/ 7:
/* unknown exports provided */
/* exports used: default */
/*!************************************************!*\
  !*** external "babel-runtime/core-js/promise" ***!
  \************************************************/
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/promise");

/***/ }),

/***/ 8:
/* unknown exports provided */
/* all exports used */
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ 9:
/* unknown exports provided */
/* exports used: renderToStaticMarkup, renderToString */
/*!***********************************!*\
  !*** external "react-dom/server" ***!
  \***********************************/
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ })

/******/ });
//# sourceMappingURL=server_bundle.js.map