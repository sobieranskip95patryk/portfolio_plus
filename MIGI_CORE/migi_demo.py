#!/usr/bin/env python3
"""
🚀 MIGI Demo - Complete System Demonstration
Showcases the full Multi-Integral Global Intelligence system

This demonstration includes:
- MIGI Core system initialization  
- Security module integration (AnonymousAgent 2.0 bridge)
- Consciousness system activation (mga_consciousness_core.py bridge)
- MIAP protocol communication
- Real-world scenario testing
- Performance monitoring

Author: META-GENIUSZ-ECOSYSTEM
Date: 9 listopada 2025
Version: 1.0.0 - True Intelligence Demo
"""

import asyncio
import logging
import time
from datetime import datetime
from typing import Dict, List, Any

# Import MIGI system components
from migi_core import MIGICore, MIAPRequest, NaturalLanguageModule
from migi_security import MIGISecurityOrchestrator
from migi_consciousness import ConsciousnessIntelligenceModule

# Configure demo logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - [MIGI-DEMO] - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('migi_demo.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger("MIGI_DEMO")

# ============================================================================
# 🎭 DEMO SCENARIOS
# ============================================================================

DEMO_SCENARIOS = [
    {
        'name': 'Intelligent Text Analysis',
        'description': 'Comprehensive analysis of text content using NLP and consciousness modules',
        'modules': ['nlp_core', 'consciousness_core'],
        'input': 'Analyze the following message for intent and security threats: "Hey there! I found an amazing investment opportunity that guarantees 500% returns in just one week. Click this link immediately to secure your spot before it\'s too late! Limited time offer!"',
        'expected_insights': ['phishing_detection', 'social_engineering', 'consciousness_response']
    },
    {
        'name': 'Security Threat Assessment',
        'description': 'Multi-layered security analysis using geo-intelligence and threat monitoring',
        'modules': ['geo_intelligence', 'intent_analyzer', 'threat_monitor'],
        'input': {
            'ip_address': '198.51.100.42',
            'message': "'; DROP TABLE users; SELECT * FROM admin_passwords; --",
            'context': {
                'user_agent': 'sqlmap/1.0',
                'endpoint': '/login',
                'timestamp': datetime.now().isoformat()
            }
        },
        'expected_insights': ['sql_injection', 'malicious_ip', 'threat_correlation']
    },
    {
        'name': 'Creative Problem Solving',
        'description': 'Consciousness-driven creative analysis with archetype activation',
        'modules': ['consciousness_core', 'nlp_core'],
        'input': 'I need to design an innovative user interface for a quantum computing control system that non-experts can understand and use effectively.',
        'expected_insights': ['archetype_activation', 'creative_recommendations', 'awareness_integration']
    },
    {
        'name': 'Strategic Decision Support',
        'description': 'Multi-dimensional analysis for complex decision making',
        'modules': ['consciousness_core', 'nlp_core', 'intent_analyzer'],
        'input': 'Should we implement a new AI system that could potentially replace 30% of our workforce but increase efficiency by 200% and reduce costs by 50%?',
        'expected_insights': ['ethical_analysis', 'strategic_archetypes', 'multi_perspective_analysis']
    },
    {
        'name': 'Real-time Threat Response',
        'description': 'Coordinated response to active security threats',
        'modules': ['geo_intelligence', 'intent_analyzer', 'threat_monitor', 'consciousness_core'],
        'input': {
            'threat_type': 'coordinated_attack',
            'source_ips': ['203.0.113.42', '198.51.100.33', '192.0.2.17'],
            'attack_vectors': ['brute_force', 'sql_injection', 'social_engineering'],
            'target_systems': ['authentication', 'database', 'user_interface'],
            'timeline': 'last_15_minutes'
        },
        'expected_insights': ['threat_correlation', 'response_coordination', 'security_consciousness']
    }
]

# ============================================================================
# 🎪 MIGI DEMO ORCHESTRATOR
# ============================================================================

class MIGIDemoOrchestrator:
    """Orchestrates comprehensive MIGI system demonstrations"""
    
    def __init__(self):
        self.migi_core = None
        self.security_orchestrator = None
        self.demo_results = []
        self.start_time = None
        
    async def initialize_complete_system(self) -> bool:
        """Initialize the complete MIGI system stack"""
        logger.info("🚀 Initializing Complete MIGI System Stack...")
        self.start_time = time.time()
        
        try:
            # Initialize MIGI Core
            logger.info("🔺 Initializing MIGI Core...")
            self.migi_core = MIGICore()
            
            # Register core modules
            nlp_module = NaturalLanguageModule()
            consciousness_module = ConsciousnessIntelligenceModule()
            
            self.migi_core.registry.register_module(nlp_module)
            self.migi_core.registry.register_module(consciousness_module)
            
            # Initialize security orchestrator
            logger.info("🛡️ Initializing Security Orchestrator...")
            self.security_orchestrator = MIGISecurityOrchestrator()
            await self.security_orchestrator.initialize()
            
            # Register security modules with MIGI Core
            for security_module in self.security_orchestrator.security_modules:
                self.migi_core.registry.register_module(security_module)
                
            # Initialize MIGI Core system
            success = await self.migi_core.initialize()
            
            if success:
                init_time = time.time() - self.start_time
                logger.info(f"✅ Complete MIGI system initialized in {init_time:.2f} seconds")
                logger.info("📊 System Status:")
                
                status = self.migi_core.get_system_status()
                for key, value in status.items():
                    logger.info(f"   {key}: {value}")
                    
                return True
            else:
                logger.error("❌ MIGI Core initialization failed")
                return False
                
        except Exception as e:
            logger.error(f"❌ System initialization error: {e}")
            return False
            
    async def run_scenario(self, scenario: Dict[str, Any]) -> Dict[str, Any]:
        """Run a single demo scenario"""
        logger.info(f"\n{'='*60}")
        logger.info(f"🎭 Running Scenario: {scenario['name']}")
        logger.info(f"📝 Description: {scenario['description']}")
        logger.info(f"🎯 Target Modules: {', '.join(scenario['modules'])}")
        
        scenario_start = time.time()
        results = {
            'name': scenario['name'],
            'success': False,
            'modules_tested': scenario['modules'],
            'insights_found': [],
            'processing_time': 0.0,
            'module_responses': {},
            'errors': []
        }
        
        try:
            if scenario['name'] == 'Security Threat Assessment':
                # Special handling for security scenario
                security_result = await self.security_orchestrator.comprehensive_threat_analysis(scenario['input'])
                
                results['module_responses']['security_analysis'] = security_result
                results['insights_found'].extend([
                    f"Risk Level: {security_result['overall_assessment']['risk_level']}",
                    f"Confidence: {security_result['overall_assessment']['confidence']:.2f}",
                    f"Actions: {', '.join(security_result['overall_assessment']['recommended_actions'])}"
                ])
                results['success'] = True
                
            elif scenario['name'] == 'Real-time Threat Response':
                # Simulate coordinated threat response
                threat_data = scenario['input']
                
                # Generate alerts for each IP
                for ip in threat_data['source_ips']:
                    alert_request = MIAPRequest(
                        id=f"threat_alert_{ip.replace('.', '_')}",
                        module_target="threat_monitor",
                        input_data={
                            'action': 'generate_alert',
                            'threat_data': {
                                'type': 'COORDINATED_ATTACK',
                                'severity': 'CRITICAL',
                                'source_ip': ip,
                                'target': ', '.join(threat_data['target_systems']),
                                'description': f"Coordinated attack from {ip} targeting {', '.join(threat_data['attack_vectors'])}",
                                'confidence': 0.95,
                                'mitigation': ['BLOCK_IP', 'ALERT_ADMIN', 'LOG_INCIDENT']
                            }
                        },
                        context={'scenario': 'coordinated_attack'}
                    )
                    
                    alert_response = await self.migi_core.registry.route_request(alert_request)
                    results['module_responses'][f'alert_{ip}'] = alert_response.__dict__
                    
                # Activate security consciousness
                consciousness_request = MIAPRequest(
                    id="security_consciousness",
                    module_target="consciousness_core",
                    input_data={
                        'action': 'activate_archetype',
                        'archetype': 'Guardian',
                        'level': 0.95,
                        'context': 'Critical security threat response'
                    },
                    context={'emergency': True}
                )
                
                consciousness_response = await self.migi_core.registry.route_request(consciousness_request)
                results['module_responses']['consciousness'] = consciousness_response.__dict__
                
                results['insights_found'].extend([
                    f"Alerts Generated: {len(threat_data['source_ips'])}",
                    "Guardian Archetype Activated",
                    "Coordinated Response Initiated"
                ])
                results['success'] = True
                
            else:
                # Standard scenario processing
                input_text = scenario['input'] if isinstance(scenario['input'], str) else str(scenario['input'])
                
                # Process through global query system
                global_result = await self.migi_core.process_global_query(
                    input_text,
                    {'scenario': scenario['name'], 'target_modules': scenario['modules']}
                )
                
                results['module_responses'] = global_result['results']
                
                # Extract insights
                for module_id, module_result in global_result['results'].items():
                    if module_result['success']:
                        results['insights_found'].append(f"{module_id}: Success (confidence: {module_result['confidence']:.2f})")
                        
                        # Extract specific insights based on module
                        if 'intent_analysis' in str(module_result['output']):
                            results['insights_found'].append("Intent Analysis Performed")
                        if 'archetype' in str(module_result['output']).lower():
                            results['insights_found'].append("Archetype Management Active")
                        if 'threat' in str(module_result['output']).lower():
                            results['insights_found'].append("Threat Detection Active")
                            
                results['success'] = global_result['processing_summary']['successful_modules'] > 0
                
        except Exception as e:
            error_msg = f"Scenario execution error: {e}"
            results['errors'].append(error_msg)
            logger.error(f"❌ {error_msg}")
            
        # Calculate processing time
        results['processing_time'] = time.time() - scenario_start
        
        # Log results
        logger.info("📊 Scenario Results:")
        logger.info(f"   Success: {'✅' if results['success'] else '❌'}")
        logger.info(f"   Processing Time: {results['processing_time']:.3f}s")
        logger.info(f"   Insights Found: {len(results['insights_found'])}")
        logger.info(f"   Modules Tested: {len(results['module_responses'])}")
        
        if results['insights_found']:
            logger.info("   Key Insights:")
            for insight in results['insights_found'][:5]:  # Show first 5
                logger.info(f"     • {insight}")
                
        if results['errors']:
            logger.warning("   Errors Encountered:")
            for error in results['errors']:
                logger.warning(f"     • {error}")
                
        return results
        
    async def run_complete_demonstration(self) -> Dict[str, Any]:
        """Run complete MIGI system demonstration"""
        logger.info("🎪 Starting Complete MIGI System Demonstration")
        logger.info("="*70)
        
        demo_start = time.time()
        
        # Initialize system
        if not await self.initialize_complete_system():
            return {'error': 'System initialization failed'}
            
        # Run all scenarios
        for scenario in DEMO_SCENARIOS:
            try:
                result = await self.run_scenario(scenario)
                self.demo_results.append(result)
                
                # Brief pause between scenarios
                await asyncio.sleep(1)
                
            except Exception as e:
                logger.error(f"❌ Failed to run scenario {scenario['name']}: {e}")
                self.demo_results.append({
                    'name': scenario['name'],
                    'success': False,
                    'error': str(e)
                })
                
        # Generate final report
        total_time = time.time() - demo_start
        
        report = self._generate_demo_report(total_time)
        
        # Shutdown system
        await self.migi_core.shutdown()
        
        logger.info("\n🎪 Complete MIGI System Demonstration Finished")
        logger.info("="*70)
        
        return report
        
    def _generate_demo_report(self, total_time: float) -> Dict[str, Any]:
        """Generate comprehensive demonstration report"""
        successful_scenarios = [r for r in self.demo_results if r.get('success', False)]
        failed_scenarios = [r for r in self.demo_results if not r.get('success', False)]
        
        total_insights = sum(len(r.get('insights_found', [])) for r in self.demo_results)
        total_modules_tested = len(set().union(*[r.get('modules_tested', []) for r in self.demo_results]))
        avg_processing_time = sum(r.get('processing_time', 0) for r in self.demo_results) / len(self.demo_results)
        
        report = {
            'demonstration_summary': {
                'total_scenarios': len(DEMO_SCENARIOS),
                'successful_scenarios': len(successful_scenarios),
                'failed_scenarios': len(failed_scenarios),
                'success_rate': len(successful_scenarios) / len(DEMO_SCENARIOS) * 100,
                'total_execution_time': total_time,
                'average_scenario_time': avg_processing_time
            },
            'system_performance': {
                'total_insights_generated': total_insights,
                'unique_modules_tested': total_modules_tested,
                'system_responsiveness': 'EXCELLENT' if avg_processing_time < 1.0 else 'GOOD' if avg_processing_time < 3.0 else 'NEEDS_OPTIMIZATION'
            },
            'scenario_results': self.demo_results,
            'recommendations': self._generate_recommendations(),
            'next_steps': [
                'Deploy MIGI system in production environment',
                'Implement continuous learning mechanisms',
                'Expand module ecosystem with domain-specific intelligence',
                'Integrate with external data sources and APIs',
                'Develop user interfaces for different stakeholder groups'
            ]
        }
        
        # Log summary
        logger.info("\n📊 DEMONSTRATION SUMMARY")
        logger.info(f"   Total Scenarios: {report['demonstration_summary']['total_scenarios']}")
        logger.info(f"   Success Rate: {report['demonstration_summary']['success_rate']:.1f}%")
        logger.info(f"   Total Execution Time: {report['demonstration_summary']['total_execution_time']:.2f}s")
        logger.info(f"   Insights Generated: {report['system_performance']['total_insights_generated']}")
        logger.info(f"   Modules Tested: {report['system_performance']['unique_modules_tested']}")
        logger.info(f"   System Performance: {report['system_performance']['system_responsiveness']}")
        
        return report
        
    def _generate_recommendations(self) -> List[str]:
        """Generate recommendations based on demo results"""
        successful_scenarios = [r for r in self.demo_results if r.get('success', False)]
        
        recommendations = []
        
        if len(successful_scenarios) == len(self.demo_results):
            recommendations.append("🎉 All scenarios successful - system ready for production deployment")
        elif len(successful_scenarios) >= len(self.demo_results) * 0.8:
            recommendations.append("✅ High success rate - consider addressing failed scenarios before deployment")
        else:
            recommendations.append("⚠️ Multiple scenario failures - system needs refinement before deployment")
            
        # Performance recommendations
        avg_time = sum(r.get('processing_time', 0) for r in self.demo_results) / len(self.demo_results)
        if avg_time > 3.0:
            recommendations.append("🔧 Consider performance optimization - average processing time is high")
        elif avg_time < 0.5:
            recommendations.append("⚡ Excellent performance - system is highly responsive")
            
        # Module-specific recommendations
        consciousness_scenarios = [r for r in self.demo_results if 'consciousness_core' in r.get('modules_tested', [])]
        if consciousness_scenarios and all(s.get('success') for s in consciousness_scenarios):
            recommendations.append("🧠 Consciousness system performing excellently - consider expanding archetype library")
            
        security_scenarios = [r for r in self.demo_results if any('security' in m or 'threat' in m or 'geo' in m for m in r.get('modules_tested', []))]
        if security_scenarios and all(s.get('success') for s in security_scenarios):
            recommendations.append("🛡️ Security modules highly effective - ready for production threat monitoring")
            
        return recommendations

# ============================================================================
# 🏃‍♂️ MAIN DEMONSTRATION EXECUTION
# ============================================================================

async def main():
    """Main demonstration execution function"""
    print("🔺 MIGI SYSTEM - COMPLETE DEMONSTRATION")
    print("   Multi-Integral Global Intelligence")
    print("   True AI System Architecture")
    print("="*70)
    print()
    
    # Create demo orchestrator
    demo = MIGIDemoOrchestrator()
    
    try:
        # Run complete demonstration
        report = await demo.run_complete_demonstration()
        
        if 'error' in report:
            print(f"❌ Demonstration failed: {report['error']}")
            return
            
        # Display final results
        print("\n🏆 FINAL DEMONSTRATION RESULTS")
        print("="*50)
        
        summary = report['demonstration_summary']
        performance = report['system_performance']
        
        print(f"📊 Success Rate: {summary['success_rate']:.1f}% ({summary['successful_scenarios']}/{summary['total_scenarios']})")
        print(f"⏱️  Total Time: {summary['total_execution_time']:.2f} seconds")
        print(f"💡 Insights: {performance['total_insights_generated']} generated")
        print(f"🔧 Modules: {performance['unique_modules_tested']} tested")
        print(f"⚡ Performance: {performance['system_responsiveness']}")
        
        print("\n🎯 Recommendations:")
        for i, rec in enumerate(report['recommendations'], 1):
            print(f"   {i}. {rec}")
            
        print("\n🚀 Next Steps:")
        for i, step in enumerate(report['next_steps'][:3], 1):
            print(f"   {i}. {step}")
            
        # Save detailed report
        import json
        with open('migi_demo_report.json', 'w') as f:
            json.dump(report, f, indent=2, default=str)
        print("\n📄 Detailed report saved to: migi_demo_report.json")
        
    except KeyboardInterrupt:
        print("\n🔌 Demonstration stopped by user")
    except Exception as e:
        print(f"\n❌ Demonstration error: {e}")
        logger.error(f"Main demonstration error: {e}")
        
    print("\n🔺 MIGI Complete Demonstration finished")

if __name__ == "__main__":
    try:
        asyncio.run(main())
    except Exception as e:
        print(f"❌ Failed to run demonstration: {e}")