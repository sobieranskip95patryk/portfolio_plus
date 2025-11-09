#!/usr/bin/env python3
"""
🧠🌐 MIGI Core - Multi-Integral Global Intelligence
Main entry point for true MIGI system

Building on:
- mga_consciousness_core.py (Jungian psychology, multi-dimensional awareness)
- AnonymousAgent 2.0 (security, threat analysis, geo-intelligence)
- MIAP Protocol (Multi Intelligence Adapter Protocol)

Author: META-GENIUSZ-ECOSYSTEM  
Date: 9 listopada 2025
Version: 1.0.0 - True Intelligence Genesis
"""

import asyncio
import logging
from typing import Dict, List, Any, Optional
from dataclasses import dataclass
from pathlib import Path
import sys

# Add parent directory to path for imports
sys.path.append(str(Path(__file__).parent.parent))

# Import existing foundations
try:
    from mga_consciousness_core import Archetype  
except ImportError:
    print("⚠️  mga_consciousness_core.py not found. Creating basic archetype system...")
    from enum import Enum
    class Archetype(Enum):
        WOJOWNIK = "Warrior"
        MEDRZEC = "Sage"  
        TWORCA = "Creator"
        OPIEKUN = "Caregiver"

# Configure MIGI Core logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - [MIGI-CORE] - %(levelname)s - %(message)s',  
    handlers=[
        logging.FileHandler('migi_core.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger("MIGI_CORE")

# ============================================================================
# 🌐 MIAP PROTOCOL - Multi Intelligence Adapter Protocol  
# ============================================================================

@dataclass
class MIAPRequest:
    """Standardized request format for all intelligence modules"""
    id: str
    module_target: str
    input_data: Any
    context: Dict[str, Any]
    priority: int = 5
    timeout: float = 30.0

@dataclass  
class MIAPResponse:
    """Standardized response format from intelligence modules"""
    request_id: str
    success: bool
    output_data: Any
    confidence: float
    processing_time: float
    metadata: Dict[str, Any]

class IntelligenceModule:
    """Base class for all MIGI intelligence modules"""
    
    def __init__(self, module_id: str, capabilities: List[str]):
        self.module_id = module_id
        self.capabilities = capabilities
        self.active = False
        
    async def initialize(self) -> bool:
        """Initialize the intelligence module"""
        logger.info(f"🔧 Initializing module: {self.module_id}")
        self.active = True
        return True
        
    async def process(self, request: MIAPRequest) -> MIAPResponse:
        """Process intelligence request - override in subclasses"""
        raise NotImplementedError("Subclasses must implement process method")
        
    async def shutdown(self) -> None:
        """Gracefully shutdown the module"""
        logger.info(f"🔌 Shutting down module: {self.module_id}")
        self.active = False
        
    def get_capabilities(self) -> List[str]:
        """Return list of module capabilities"""
        return self.capabilities
        
    def get_confidence(self) -> float:
        """Return current confidence level of module"""
        return 0.85  # Default confidence

# ============================================================================
# 🧠 INTELLIGENCE REGISTRY - Central Module Management
# ============================================================================

class IntelligenceRegistry:
    """Central registry for all intelligence modules in MIGI system"""
    
    def __init__(self):
        self.modules: Dict[str, IntelligenceModule] = {}
        self.dependencies: Dict[str, List[str]] = {}
        self.active_modules: List[str] = []
        
    def register_module(self, module: IntelligenceModule) -> bool:
        """Register a new intelligence module"""
        try:
            self.modules[module.module_id] = module
            logger.info(f"📝 Registered module: {module.module_id}")
            logger.info(f"   Capabilities: {', '.join(module.get_capabilities())}")
            return True
        except Exception as e:
            logger.error(f"❌ Failed to register module {module.module_id}: {e}")
            return False
            
    async def initialize_all_modules(self) -> bool:
        """Initialize all registered modules"""
        logger.info("🚀 Initializing all MIGI intelligence modules...")
        
        for module_id, module in self.modules.items():
            try:
                success = await module.initialize()
                if success:
                    self.active_modules.append(module_id)
                    logger.info(f"✅ Module {module_id} initialized successfully")
                else:
                    logger.warning(f"⚠️ Module {module_id} failed to initialize")
            except Exception as e:
                logger.error(f"❌ Error initializing module {module_id}: {e}")
                
        logger.info(f"🎯 Initialized {len(self.active_modules)}/{len(self.modules)} modules")
        return len(self.active_modules) > 0
        
    async def route_request(self, request: MIAPRequest) -> MIAPResponse:
        """Route request to appropriate intelligence module"""
        if request.module_target not in self.modules:
            return MIAPResponse(
                request_id=request.id,
                success=False,
                output_data=f"Module {request.module_target} not found",
                confidence=0.0,
                processing_time=0.0,
                metadata={"error": "MODULE_NOT_FOUND"}
            )
            
        module = self.modules[request.module_target]
        
        if not module.active:
            return MIAPResponse(
                request_id=request.id,
                success=False, 
                output_data=f"Module {request.module_target} is not active",
                confidence=0.0,
                processing_time=0.0,
                metadata={"error": "MODULE_INACTIVE"}
            )
            
        try:
            start_time = asyncio.get_event_loop().time()
            response = await module.process(request)
            end_time = asyncio.get_event_loop().time()
            response.processing_time = end_time - start_time
            return response
        except Exception as e:
            logger.error(f"❌ Error processing request in module {request.module_target}: {e}")
            return MIAPResponse(
                request_id=request.id,
                success=False,
                output_data=str(e),
                confidence=0.0,
                processing_time=0.0,
                metadata={"error": "PROCESSING_ERROR"}
            )

# ============================================================================
# 🌍 GLOBAL CONTEXT ENGINE - Multi-dimensional Awareness
# ============================================================================

class GlobalContextEngine:
    """Manages global context across all intelligence modules"""
    
    def __init__(self):
        self.active_archetypes: List[Archetype] = []
        self.context_stack: List[Dict[str, Any]] = []
        self.consciousness_level: float = 87.5
        self.global_memory: Dict[str, Any] = {}
        
    def add_archetype(self, archetype: Archetype) -> None:
        """Activate an archetype in global context"""
        if archetype not in self.active_archetypes:
            self.active_archetypes.append(archetype)
            logger.info(f"🎭 Activated archetype: {archetype.value}")
            
    def remove_archetype(self, archetype: Archetype) -> None:
        """Deactivate an archetype from global context"""
        if archetype in self.active_archetypes:
            self.active_archetypes.remove(archetype)
            logger.info(f"🎭 Deactivated archetype: {archetype.value}")
            
    def push_context(self, context: Dict[str, Any]) -> None:
        """Push new context onto the stack"""
        self.context_stack.append(context)
        logger.debug(f"📚 Context pushed. Stack depth: {len(self.context_stack)}")
        
    def pop_context(self) -> Optional[Dict[str, Any]]:
        """Pop context from the stack"""
        if self.context_stack:
            context = self.context_stack.pop()
            logger.debug(f"📚 Context popped. Stack depth: {len(self.context_stack)}")
            return context
        return None
        
    def get_current_context(self) -> Dict[str, Any]:
        """Get current global context"""
        return {
            'active_archetypes': [arch.value for arch in self.active_archetypes],
            'consciousness_level': self.consciousness_level,
            'context_depth': len(self.context_stack),
            'global_memory_size': len(self.global_memory),
            'current_context': self.context_stack[-1] if self.context_stack else {}
        }
        
    def update_consciousness(self, delta: float) -> None:
        """Update consciousness level"""
        old_level = self.consciousness_level
        self.consciousness_level = max(0.0, min(100.0, self.consciousness_level + delta))
        if abs(self.consciousness_level - old_level) > 0.1:
            logger.info(f"🧠 Consciousness level: {old_level:.1f}% → {self.consciousness_level:.1f}%")

# ============================================================================
# 🚀 MIGI CORE SYSTEM - Main Orchestrator
# ============================================================================

class MIGICore:
    """Main MIGI system orchestrator"""
    
    def __init__(self):
        self.registry = IntelligenceRegistry()
        self.context_engine = GlobalContextEngine()
        self.running = False
        self.version = "1.0.0"
        
    async def initialize(self) -> bool:
        """Initialize the complete MIGI system"""
        logger.info("🔺 MIGI Core System Initialization Starting...")
        logger.info(f"   Version: {self.version}")
        logger.info("   Multi-Integral Global Intelligence")
        
        # Initialize context engine with default archetypes
        self.context_engine.add_archetype(Archetype.MEDRZEC)  # Wisdom for decision making
        self.context_engine.add_archetype(Archetype.TWORCA)   # Creativity for problem solving
        
        # Initialize all registered modules
        success = await self.registry.initialize_all_modules()
        
        if success:
            self.running = True
            logger.info("✅ MIGI Core System initialized successfully")
            logger.info(f"🧠 Consciousness Level: {self.context_engine.consciousness_level}%")
            return True
        else:
            logger.error("❌ MIGI Core System initialization failed")
            return False
            
    async def process_global_query(self, query: str, context: Dict[str, Any] = None) -> Dict[str, Any]:
        """Process a global intelligence query across multiple modules"""
        if not self.running:
            return {"error": "MIGI Core not initialized"}
            
        logger.info(f"🌐 Processing global query: {query[:100]}...")
        
        # Add current context
        if context is None:
            context = {}
        context.update(self.context_engine.get_current_context())
        
        # Determine which modules should process this query
        # For now, we'll process with all active modules
        results = {}
        
        for module_id in self.registry.active_modules:
            request = MIAPRequest(
                id=f"global_{asyncio.get_event_loop().time()}",
                module_target=module_id,
                input_data=query,
                context=context
            )
            
            response = await self.registry.route_request(request)
            results[module_id] = {
                'success': response.success,
                'output': response.output_data,
                'confidence': response.confidence,
                'processing_time': response.processing_time
            }
            
        # Update consciousness based on query complexity and results
        successful_modules = sum(1 for r in results.values() if r['success'])
        consciousness_delta = (successful_modules / len(results)) * 0.5
        self.context_engine.update_consciousness(consciousness_delta)
        
        return {
            'query': query,
            'results': results,
            'global_context': self.context_engine.get_current_context(),
            'processing_summary': {
                'total_modules': len(results),
                'successful_modules': successful_modules,
                'average_confidence': sum(r['confidence'] for r in results.values()) / len(results)
            }
        }
        
    def get_system_status(self) -> Dict[str, Any]:
        """Get comprehensive system status"""
        return {
            'version': self.version,
            'running': self.running,
            'registered_modules': len(self.registry.modules),
            'active_modules': len(self.registry.active_modules),
            'consciousness_level': self.context_engine.consciousness_level,
            'active_archetypes': [arch.value for arch in self.context_engine.active_archetypes],
            'context_depth': len(self.context_engine.context_stack)
        }
        
    async def shutdown(self) -> None:
        """Gracefully shutdown MIGI system"""
        logger.info("🔌 MIGI Core System shutdown initiated...")
        
        # Shutdown all modules
        for module in self.registry.modules.values():
            await module.shutdown()
            
        self.running = False
        logger.info("✅ MIGI Core System shutdown complete")

# ============================================================================
# 🔧 EXAMPLE INTELLIGENCE MODULE - Natural Language Processor  
# ============================================================================

class NaturalLanguageModule(IntelligenceModule):
    """Example NLP intelligence module"""
    
    def __init__(self):
        super().__init__(
            module_id="nlp_core",
            capabilities=["text_analysis", "intent_detection", "sentiment_analysis"]
        )
        
    async def process(self, request: MIAPRequest) -> MIAPResponse:
        """Process natural language input"""
        try:
            text = str(request.input_data)
            
            # Simple intent detection (can be enhanced with ML models)
            intents = []
            if any(word in text.lower() for word in ['question', '?', 'what', 'how', 'why']):
                intents.append('query')
            if any(word in text.lower() for word in ['create', 'make', 'build', 'generate']):
                intents.append('creation')
            if any(word in text.lower() for word in ['analyze', 'examine', 'study']):
                intents.append('analysis')
                
            # Simple sentiment analysis
            positive_words = ['good', 'great', 'excellent', 'amazing', 'wonderful']
            negative_words = ['bad', 'terrible', 'awful', 'horrible', 'wrong']
            
            positive_score = sum(1 for word in positive_words if word in text.lower())
            negative_score = sum(1 for word in negative_words if word in text.lower())
            
            if positive_score > negative_score:
                sentiment = 'positive'
            elif negative_score > positive_score:
                sentiment = 'negative'  
            else:
                sentiment = 'neutral'
                
            result = {
                'text_length': len(text),
                'word_count': len(text.split()),
                'detected_intents': intents,
                'sentiment': sentiment,
                'sentiment_scores': {
                    'positive': positive_score,
                    'negative': negative_score
                }
            }
            
            return MIAPResponse(
                request_id=request.id,
                success=True,
                output_data=result,
                confidence=0.75,
                processing_time=0.0,  # Will be set by registry
                metadata={'module': 'nlp_core', 'version': '1.0'}
            )
            
        except Exception as e:
            return MIAPResponse(
                request_id=request.id,
                success=False,
                output_data=str(e),
                confidence=0.0,
                processing_time=0.0,
                metadata={'error': str(e)}
            )

# ============================================================================
# 🏃‍♂️ MAIN EXECUTION
# ============================================================================

async def main():
    """Main MIGI Core execution function"""
    
    # Create MIGI Core system
    migi = MIGICore()
    
    # Register example modules
    nlp_module = NaturalLanguageModule()
    migi.registry.register_module(nlp_module)
    
    # Initialize system
    success = await migi.initialize()
    if not success:
        logger.error("❌ Failed to initialize MIGI system")
        return
        
    # Show system status
    status = migi.get_system_status()
    logger.info("📊 MIGI System Status:")
    for key, value in status.items():
        logger.info(f"   {key}: {value}")
        
    # Example global query processing
    test_queries = [
        "What is the meaning of consciousness?",
        "Create a plan for artificial intelligence development", 
        "Analyze the current state of global intelligence systems"
    ]
    
    for query in test_queries:
        logger.info(f"\n{'='*60}")
        result = await migi.process_global_query(query)
        logger.info(f"Query: {result['query']}")
        logger.info(f"Results: {len(result['results'])} modules processed")
        logger.info(f"Average confidence: {result['processing_summary']['average_confidence']:.2f}")
        logger.info(f"Consciousness level: {result['global_context']['consciousness_level']:.1f}%")
        
    # Graceful shutdown
    await migi.shutdown()

if __name__ == "__main__":
    print("🔺 MIGI Core - Multi-Integral Global Intelligence")
    print("   TRUE INTELLIGENCE SYSTEM STARTING...")
    print()
    
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        print("\n🔌 System shutdown by user")
    except Exception as e:
        print(f"\n❌ System error: {e}")
        logger.error(f"System error: {e}")
    
    print("\n🔺 MIGI Core execution complete")